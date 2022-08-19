<template>
  <div>
    <n-grid :x-gap="20" :cols="24">
      <n-gi :span="16">
        <cropper-canvas
          v-if="flag"
          background
          :disabled="disabled"
          style="width: 100%; height: 400px"
        >
          <cropper-image
            v-if="src"
            ref="imageRef"
            :src="src"
            :alt="alt"
            :rotatable="src"
            :scalable="src"
            :skewable="src"
            :translatable="src"
            crossorigin="anonymous"
          ></cropper-image>

          <cropper-shade hidden></cropper-shade>

          <cropper-handle action="select" plain></cropper-handle>

          <cropper-selection
            :id="selectionId"
            ref="selectionRef"
            initial-coverage="0.5"
            :movable="src"
            :resizable="src"
            :zoomable="src"
            :keyboard="src"
            :outlined="src"
            @change="onSelectionChange"
          >
            <cropper-grid role="grid" covered bordered></cropper-grid>
            <cropper-crosshair centered></cropper-crosshair>

            <cropper-handle
              action="move"
              theme-color="rgba(255, 255, 255, 0.35)"
            ></cropper-handle>
            <cropper-handle action="n-resize"></cropper-handle>
            <cropper-handle action="e-resize"></cropper-handle>
            <cropper-handle action="s-resize"></cropper-handle>
            <cropper-handle action="w-resize"></cropper-handle>
            <cropper-handle action="ne-resize"></cropper-handle>
            <cropper-handle action="nw-resize"></cropper-handle>
            <cropper-handle action="se-resize"></cropper-handle>
            <cropper-handle action="sw-resize"></cropper-handle>
          </cropper-selection>
        </cropper-canvas>
      </n-gi>

      <n-gi :span="8" class="vstack">
        <w-scrollbar v-if="flag" height="330px">
          <n-space vertical size="large">
            <cropper-viewer
              class="border-1 border-bodyColor"
              :selection="`#${selectionId}`"
              style="height: 200px"
            ></cropper-viewer>

            <n-grid :x-gap="10" :cols="24">
              <n-gi :span="12">
                <cropper-viewer
                  class="border-1 border-bodyColor"
                  :selection="`#${selectionId}`"
                  style="height: 80px"
                >
                </cropper-viewer>
              </n-gi>

              <n-gi :span="8">
                <cropper-viewer
                  class="border-1 border-bodyColor"
                  :selection="`#${selectionId}`"
                  style="height: 60px"
                >
                </cropper-viewer>
              </n-gi>

              <n-gi :span="4">
                <cropper-viewer
                  class="border-1 border-light-50"
                  :selection="`#${selectionId}`"
                  style="height: 40px"
                >
                </cropper-viewer>
              </n-gi>
            </n-grid>
          </n-space>
        </w-scrollbar>

        <n-space>
          <w-abs-image ref="absImage" @change="onUploadChange">
            <w-a-icon
              :text="false"
              size="small"
              height="16"
              placement="bottom"
              icon="ant-design:picture-outlined"
              :help-message="t('comp.cropper.choose')"
            >
            </w-a-icon>
          </w-abs-image>

          <w-a-icon
            v-for="item in buttons"
            :key="item.icon"
            :text="false"
            size="small"
            height="16"
            placement="bottom"
            :icon="item.icon"
            :disabled="!src"
            :help-message="item.helpMessage"
            @click="item.event"
          ></w-a-icon>
        </n-space>
      </n-gi>
    </n-grid>
  </div>
</template>

<script lang="ts" setup>
  import type { CropperImage, CropperSelection } from 'cropperjs'
  import type { WAbsImageInst } from '@/components/Extra/AbsImage'

  import 'cropperjs'
  import { genString } from 'easy-fns-ts'

  // TODO 888
  interface InternalProps {
    src?: string
    alt?: string
    value?: string
    disabled?: boolean
    center?: boolean
  }

  const props = withDefaults(defineProps<InternalProps>(), {})
  const emits = defineEmits(['update:value', 'update:src'])

  const { t } = useAppI18n()

  const selectionId = ref('s-' + genString(8))
  const flag = ref(true)

  const absImage = ref<WAbsImageInst>()

  // third party libs should use shallowRef !!!
  const imageRef = shallowRef<Nullable<CropperImage>>(null)
  const selectionRef = shallowRef<Nullable<CropperSelection>>(null)

  const initSelectionData = ref<{
    x: number
    y: number
    width: number
    height: number
  }>()

  const {
    createBlobUrl: createBlobUrlCropper,
    tempBlobURL: tempBlobURLCropper,
  } = useBlob()

  watch(
    () => props.src,
    () => {
      initSelectionData.value = undefined
      flag.value = false
      nextTick(() => {
        flag.value = true
      })
    },
    { immediate: true }
  )

  const debounced = useDebounceFn(() => {
    nextTick(async () => {
      await onGetCropperValue()
    })
  }, 500)

  const onSelectionChange = (e: any) => {
    debounced()
    if (selectionRef.value) return
    initSelectionData.value = e.detail
  }

  const onReset = async () => {
    imageRef.value!.$resetTransform()
    imageRef.value!.$center('cover')

    selectionRef.value!.$change(
      initSelectionData.value?.x!,
      initSelectionData.value?.y!,
      initSelectionData.value?.width,
      initSelectionData.value?.height
    )
    selectionRef.value!.$center()

    await onGetCropperValue()
  }

  const onScale = async (scale: number) => {
    if (scale === 1) {
      imageRef.value!.$scale(-1, 1)
    }

    if (scale === 2) {
      imageRef.value!.$scale(1, -1)
    }

    await onGetCropperValue()
  }

  const onRotate = async (n: string) => {
    imageRef.value!.$rotate(n)

    await onGetCropperValue()
  }

  const onZoom = async (n: number) => {
    imageRef.value!.$zoom(n)

    await onGetCropperValue()
  }

  const onDownload = async () => {
    await onGetCropperValue()

    await downloadByUrl(tempBlobURLCropper.value!)
  }

  const onUploadChange = async () => {
    const tempBlobURLSrc = await absImage.value?.onGetBlobURL()

    emits('update:src', tempBlobURLSrc)
  }

  const onGetCropperValue = async () => {
    const canvas = await selectionRef.value?.$toCanvas()

    const base64 = canvas?.toDataURL('image/png')!

    const blob = await base64ToBlob(base64)

    await createBlobUrlCropper(blob)

    emits('update:value', tempBlobURLCropper.value)
  }

  defineExpose({
    onGetCropperBlob: () => absImage.value?.onGetBlob(),
  })

  const buttons = [
    {
      icon: 'ant-design:zoom-in-outlined',
      event: () => onZoom(0.1),
      helpMessage: () => t('comp.cropper.zoomin'),
    },
    {
      icon: 'ant-design:zoom-out-outlined',
      event: () => onZoom(-0.1),
      helpMessage: () => t('comp.cropper.zoomout'),
    },
    {
      icon: 'mdi:flip-horizontal',
      event: () => onScale(1),
      helpMessage: () => t('comp.cropper.fliph'),
    },
    {
      icon: 'mdi:flip-vertical',
      event: () => onScale(2),
      helpMessage: () => t('comp.cropper.flipv'),
    },
    {
      icon: 'ant-design:rotate-right-outlined',
      event: () => onRotate('-45deg'),
      helpMessage: () => t('comp.cropper.clockwise-rotate'),
    },
    {
      icon: 'ant-design:rotate-left-outlined',
      event: () => onRotate('45deg'),
      helpMessage: () => t('comp.cropper.anti-clockwise-rotate'),
    },
    {
      icon: 'ant-design:reload-outlined',
      event: () => onReset(),
      helpMessage: () => t('app.button.reset'),
    },
    {
      icon: 'ant-design:download-outlined',
      event: () => onDownload(),
      helpMessage: () => t('app.button.download'),
    },
  ]

  onMounted(() => {
    if (props.src && props.center) {
      setTimeout(() => {
        onReset()
      }, 200)
    }
  })
</script>

<script lang="ts">
  export default defineComponent({
    name: 'WVendorCropper',
  })
</script>
