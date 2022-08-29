<template>
  <n-watermark
    :id="wrapperId"
    :content="content"
    :font-size="16"
    :line-height="16"
    :width="192"
    :height="128"
    :x-offset="12"
    :y-offset="28"
    :rotate="-15"
    :style="{ width: width, height: height }"
  >
    <div
      class="relative"
      :style="{ width: width, height: height }"
      @touchmove.prevent
    >
      <canvas
        ref="signPadRef"
        :id="signPadId"
        class="w-full h-full"
        :data-uid="signPadId"
        :disabled="disabled"
      ></canvas>

      <!-- left utils -->
      <div
        class="signpad-utils absolute top-1/2 left-4 -translate-y-1/2 z-{9999}"
      >
        <n-space vertical>
          <n-tooltip :disabled="disabled" trigger="click" placement="right">
            <template #trigger>
              <n-button :disabled="disabled" type="primary" text>
                <w-icon
                  icon="ant-design:font-colors-outlined"
                  width="20"
                ></w-icon>
              </n-button>
            </template>

            <template #>
              <div class="h-48">
                <n-slider
                  v-model:value="pencil"
                  :max="20"
                  show-tooltip
                  vertical
                  @update:value="onChangePencil"
                />
              </div>
            </template>
          </n-tooltip>

          <n-tooltip :disabled="disabled" trigger="click" placement="right">
            <template #trigger>
              <n-button :disabled="disabled" type="info" text>
                <w-icon
                  icon="ant-design:bg-colors-outlined"
                  width="20"
                ></w-icon>
              </n-button>
            </template>

            <template #>
              <div class="h-48 vstack gap-1">
                <div
                  :class="[
                    'h-6 w-6',
                    { 'shadow-2xl brightness-50 contrast-50': item === color },
                  ]"
                  v-for="(item, index) in colors"
                  :key="index"
                  :style="{ backgroundColor: item }"
                  @click="onChangeColor(item)"
                ></div>
              </div>
            </template>
          </n-tooltip>

          <n-button :disabled="disabled" type="warning" text @click="undo">
            <w-icon icon="ant-design:undo-outlined" width="20"></w-icon>
          </n-button>

          <n-button :disabled="disabled" type="error" text @click="clear">
            <w-icon icon="ant-design:clear-outlined" width="20"></w-icon>
          </n-button>
        </n-space>
      </div>

      <!-- right utils -->
      <div
        class="signpad-utils absolute top-1/2 right-2 -translate-y-1/2 z-{9999}"
      >
        <n-space vertical>
          <n-button
            :disabled="disabled"
            type="primary"
            text
            @click="onDownload('png')"
          >
            <div class="hstack justify-center items-center gap-2">
              <span> png </span>
              <w-icon icon="ant-design:download-outlined" width="20"></w-icon>
            </div>
          </n-button>

          <n-button
            :disabled="disabled"
            type="primary"
            text
            @click="onDownload('jpeg')"
          >
            <div class="hstack justify-center items-center gap-2">
              <span> jpeg </span>
              <w-icon icon="ant-design:download-outlined" width="20"></w-icon>
            </div>
          </n-button>
        </n-space>
      </div>
    </div>
  </n-watermark>
</template>

<script lang="ts" setup>
  import type { Options } from 'signature_pad'
  import SignaturePad from 'signature_pad'
  import { toJpeg, toPng } from 'html-to-image'
  import { genString } from 'easy-fns-ts'

  interface InternalProps {
    options?: Options
    height?: string
    width?: string
    disabled?: boolean
    defaultUrl?: string
    content?: string
  }

  const props = withDefaults(defineProps<InternalProps>(), {
    width: '100%',
    height: '100%',
    // @ts-ignore
    options: {},
  })

  const signPadId = ref('signpad-' + genString(8))
  const wrapperId = ref('wrapper-' + genString(8))

  const signPadInst = shallowRef<Nullable<SignaturePad>>(null)
  const signPadRef = ref<Nullable<HTMLCanvasElement>>(null)

  const url = ref<string>()
  const color = ref<string>('rgb(0, 0, 0)')
  const pencil = ref<number>(2)

  const colors = [
    'rgb(0,0,0)',
    'rgb(255,193,7)',
    'rgb(255,87,34)',
    'rgb(233,30,99)',
    'rgb(103,58,183)',
    'rgb(0,188,212)',
    'rgb(239,239,239)',
  ]

  watchEffect(() => {
    if (props.disabled) {
      signPadInst.value?.off()
    } else {
      signPadInst.value?.on()
    }
  })

  const onResize = (c: HTMLCanvasElement) => {
    if (!isEmpty()) {
      url.value = save()
    }

    const ratio = Math.max(window.devicePixelRatio || 1, 1)

    const reg = RegExp(/px/)

    c.width = reg.test(props.width!)
      ? Number(props.width!.replace(/px/g, '')) * ratio
      : c.offsetWidth * ratio

    c.height = reg.test(props.height!)
      ? Number(props.height!.replace(/px/g, '')) * ratio
      : c.offsetHeight * ratio

    c.getContext('2d')!.scale(ratio, ratio)

    clear()

    if (props.defaultUrl || url.value) {
      fromDataURL(props.defaultUrl || url.value!)
    }
  }

  const onInit = () => {
    const canvas = document.getElementById(
      signPadId.value
    )! as HTMLCanvasElement

    signPadInst.value = new SignaturePad(
      canvas,
      Object.assign(props.options!, { backgroundColor: 'rgb(255,255,255)' })
    )

    onResize(canvas)

    useResize(() => onResize(canvas))
  }

  const onChangePencil = (v: number) => {
    pencil.value = v
    signPadInst.value!.dotSize = v
    signPadInst.value!.minWidth = v
    signPadInst.value!.maxWidth = v
  }

  const onChangeColor = (item: string) => {
    color.value = item
    signPadInst.value!.penColor = item
  }

  const clear = () => {
    signPadInst.value?.clear()
  }

  const save = (format?: string) =>
    format
      ? signPadInst.value?.toDataURL(format)
      : signPadInst.value?.toDataURL()

  const onDownload = (type: string) => {
    const target = document.getElementById(wrapperId.value)!

    const filter = (node: Element) => {
      const exclusionClasses = ['signpad-utils']
      return !exclusionClasses.some((classname) => {
        if (node.classList) {
          return Array.from(node.classList).includes(classname)
        }
      })
    }

    if (type === 'png') {
      toPng(target, { filter }).then((dataUrl) => downloadByBase64(dataUrl))
    }

    if (type === 'jpeg') {
      toJpeg(target, { filter }).then((dataUrl) => downloadByBase64(dataUrl))
    }
  }

  const fromDataURL = (url: string) => {
    signPadInst.value?.fromDataURL(url)
  }

  const isEmpty = () => signPadInst.value?.isEmpty()

  const undo = () => {
    const data = signPadInst.value?.toData()

    if (data) {
      data.pop()
      signPadInst.value?.fromData(data)
    }
  }

  onMounted(() => {
    onInit()
  })

  defineExpose({
    save,
    clear,
    isEmpty,
    undo,
    fromDataURL,
  })
</script>

<script lang="ts">
  export default defineComponent({
    name: 'WVendorSignaturePad',
  })
</script>
