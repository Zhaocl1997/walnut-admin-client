<template>
  <n-grid :x-gap="20" :cols="24">
    <n-gi :span="16">
      <cropper-canvas
        background
        :disabled="disabled"
        style="width: 100%; height: 400px"
      >
        <cropper-image
          ref="imageRef"
          :src="src"
          :alt="alt"
          rotatable
          scalable
          skewable
          translatable
        ></cropper-image>

        <cropper-shade hidden></cropper-shade>

        <cropper-handle action="select" plain></cropper-handle>

        <cropper-selection
          id="cropperSelection"
          ref="selectionRef"
          initial-coverage="0.5"
          movable
          resizable
          zoomable
          keyboard
          outlined
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

    <n-gi :span="8" class="vstack justify-evenly">
      <n-space vertical size="large">
        <cropper-viewer
          selection="#cropperSelection"
          style="width: 100%"
        ></cropper-viewer>

        <n-grid :x-gap="10" :cols="24">
          <n-gi :span="12">
            <cropper-viewer selection="#cropperSelection" style="height: 80px">
            </cropper-viewer>
          </n-gi>

          <n-gi :span="8">
            <cropper-viewer selection="#cropperSelection" style="height: 60px">
            </cropper-viewer>
          </n-gi>

          <n-gi :span="4">
            <cropper-viewer selection="#cropperSelection" style="height: 40px">
            </cropper-viewer>
          </n-gi>
        </n-grid>
      </n-space>

      <n-space>
        <w-a-icon
          v-for="item in buttons"
          :key="item.icon"
          :text="false"
          size="small"
          height="16"
          placement="bottom"
          :icon="item.icon"
          :help-message="item.helpMessage"
          @click="item.event"
        ></w-a-icon>
      </n-space>
    </n-gi>
  </n-grid>
</template>

<script lang="ts" setup>
  import type { CropperImage, CropperSelection } from 'cropperjs'
  import 'cropperjs'
  import { downloadByUrl } from '/@/utils/file/download'

  // TODO 888
  interface InternalProps {
    src: string
    alt: string
    disabled?: boolean
  }

  const props = withDefaults(defineProps<InternalProps>(), {})

  const { t } = useAppI18n()

  const imageRef = ref<Nullable<CropperImage>>(null)
  const selectionRef = ref<Nullable<CropperSelection>>(null)

  const initSelectionData = ref<{
    x: number
    y: number
    width: number
    height: number
  }>()

  const onSelectionChange = (e: any) => {
    if (selectionRef.value) return
    initSelectionData.value = e.detail
  }

  const onReset = () => {
    imageRef.value!.$resetTransform()
    imageRef.value!.$center('cover')

    selectionRef.value!.$change(
      initSelectionData.value?.x!,
      initSelectionData.value?.y!,
      initSelectionData.value?.width,
      initSelectionData.value?.height
    )
    selectionRef.value!.$center()
  }

  const onScale = (scale: number) => {
    if (scale === 1) {
      imageRef.value!.$scale(-1, 1)
    }

    if (scale === 2) {
      imageRef.value!.$scale(1, -1)
    }
  }

  const onRotate = (n: string) => {
    imageRef.value!.$rotate(n)
  }

  const onZoom = (n: number) => {
    imageRef.value!.$zoom(n)
  }

  const onDownload = async () => {
    const canvas = await selectionRef.value!.$toCanvas()

    const url = canvas.toDataURL('image/png')

    downloadByUrl({ url })
  }

  const buttons = [
    {
      icon: 'ant-design:zoom-in-outlined',
      event: () => onZoom(0.1),
      helpMessage: () => t('comp:cropper:zoomin'),
    },
    {
      icon: 'ant-design:zoom-out-outlined',
      event: () => onZoom(-0.1),
      helpMessage: () => t('comp:cropper:zoomout'),
    },
    {
      icon: 'mdi:flip-horizontal',
      event: () => onScale(1),
      helpMessage: () => t('comp:cropper:fliph'),
    },
    {
      icon: 'mdi:flip-vertical',
      event: () => onScale(2),
      helpMessage: () => t('comp:cropper:flipv'),
    },
    {
      icon: 'ant-design:rotate-right-outlined',
      event: () => onRotate('-45deg'),
      helpMessage: () => t('comp:cropper:clockwise-rotate'),
    },
    {
      icon: 'ant-design:rotate-left-outlined',
      event: () => onRotate('45deg'),
      helpMessage: () => t('comp:cropper:anti-clockwise-rotate'),
    },
    {
      icon: 'ant-design:reload-outlined',
      event: () => onReset(),
      helpMessage: () => t('app:button:reset'),
    },
    {
      icon: 'ant-design:download-outlined',
      event: () => onDownload(),
      helpMessage: () => t('app:button:download'),
    },
  ]
</script>

<script lang="ts">
  export default defineComponent({
    name: 'WVendorCropper',
  })
</script>
