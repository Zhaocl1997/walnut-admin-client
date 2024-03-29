<script lang="ts" setup>
import type { Options } from 'signature_pad'
import SignaturePad from 'signature_pad'
import { toJpeg, toPng } from 'html-to-image'
import { genString } from 'easy-fns-ts'

// TODO 888
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
  // @ts-expect-error
  options: {},
})

const signPadId = ref(`signpad-${genString(8)}`)
const wrapperId = ref(`wrapper-${genString(8)}`)

const signPadInst = shallowRef<Nullable<SignaturePad>>(null)

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
  if (props.disabled)
    signPadInst.value?.off()
  else
    signPadInst.value?.on()
})

const onResize = (c: HTMLCanvasElement) => {
  if (!isEmpty())
    url.value = save()

  const ratio = Math.max(window.devicePixelRatio || 1, 1)

  const reg = /px/

  c.width = reg.test(props.width!)
    ? Number(props.width!.replace(/px/g, '')) * ratio
    : c.offsetWidth * ratio

  c.height = reg.test(props.height!)
    ? Number(props.height!.replace(/px/g, '')) * ratio
    : c.offsetHeight * ratio

  c.getContext('2d')!.scale(ratio, ratio)

  clear()

  if (props.defaultUrl || url.value)
    fromDataURL(props.defaultUrl || url.value!)
}

const onInit = () => {
  const canvas = document.getElementById(
    signPadId.value,
  )! as HTMLCanvasElement

  signPadInst.value = new SignaturePad(
    canvas,
    Object.assign(props.options!, { backgroundColor: 'rgb(255,255,255)' }),
  )

  onResize(canvas)

  useWindowResize(() => onResize(canvas))
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

const onFinalAction = async (
  type: 'png' | 'jpeg' = 'png',
  way: 'download' | 'get' = 'download',
) => {
  const target = document.getElementById(wrapperId.value)!

  // filter left/right custom utils
  const filter = (node: Element) => {
    const exclusionClasses = ['signpad-utils']
    return !exclusionClasses.some((classname) => {
      if (node.classList)
        return Array.from(node.classList).includes(classname)
      return false
    })
  }

  if (type === 'png') {
    const res = await toPng(target, { filter })

    if (way === 'download')
      downloadByBase64(res)
    else
      return res
  }

  if (type === 'jpeg') {
    const res = await toJpeg(target, { filter })

    if (way === 'download')
      downloadByBase64(res)
    else
      return res
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

const getImage = (type = 'png') => onFinalAction(type, 'get')

onMounted(() => {
  onInit()
})

defineExpose({
  save,
  clear,
  isEmpty,
  undo,
  fromDataURL,
  getImage,
})
</script>

<script lang="ts">
export default defineComponent({
  name: 'WVendorSignaturePad',
})
</script>

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
    :style="{ width, height }"
  >
    <div
      class="relative"
      :style="{ width, height }"
      @touchmove.prevent
    >
      <canvas
        :id="signPadId"
        class="w-full h-full"
        :data-uid="signPadId"
        :disabled="disabled"
      />

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
                />
              </n-button>
            </template>

            <template #default>
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
                />
              </n-button>
            </template>

            <template #default>
              <div class="h-48 vstack gap-1">
                <div
                  v-for="(item, index) in colors" :key="index"
                  class="h-6 w-6"
                  :class="[
                    { 'shadow-2xl brightness-50 contrast-50': item === color },
                  ]"
                  :style="{ backgroundColor: item }"
                  @click="onChangeColor(item)"
                />
              </div>
            </template>
          </n-tooltip>

          <n-button :disabled="disabled" type="warning" text @click="undo">
            <w-icon icon="ant-design:undo-outlined" width="20" />
          </n-button>

          <n-button :disabled="disabled" type="error" text @click="clear">
            <w-icon icon="ant-design:clear-outlined" width="20" />
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
            @click="onFinalAction('png')"
          >
            <div class="hstack justify-center items-center gap-2">
              <span> png </span>
              <w-icon icon="ant-design:download-outlined" width="20" />
            </div>
          </n-button>

          <n-button
            :disabled="disabled"
            type="primary"
            text
            @click="onFinalAction('jpeg')"
          >
            <div class="hstack justify-center items-center gap-2">
              <span> jpeg </span>
              <w-icon icon="ant-design:download-outlined" width="20" />
            </div>
          </n-button>
        </n-space>
      </div>
    </div>
  </n-watermark>
</template>
