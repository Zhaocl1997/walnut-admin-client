<script lang="ts" setup>
import type { WCompExtraAbsImageInst } from '@/components/Extra/AbsImage'
import type { ICompVendorCropperProps } from '.'
import { CropperCanvas, CropperCrosshair, CropperGrid, CropperHandle, CropperImage, CropperSelection, CropperShade, CropperViewer } from 'cropperjs'
import { nanoid } from 'nanoid'

defineOptions({
  name: 'WCompVendorCropper',
})
const { disabled = false } = defineProps<ICompVendorCropperProps>()

const blobURL = defineModel<string>('value')
const srcURL = defineModel<string>('src')

// need to call $define to work
CropperCanvas.$define()
CropperImage.$define()
CropperSelection.$define()
CropperShade.$define()
CropperHandle.$define()
CropperViewer.$define()
CropperGrid.$define()
CropperCrosshair.$define()

const { t } = useAppI18n()

const selectionId = ref(`c-${nanoid(8)}`)

const absImageRef = templateRef<WCompExtraAbsImageInst>('absImageRef')
const cropperImageRef = templateRef<CropperImage>('cropperImageRef')
const cropperSelectionRef = templateRef<CropperSelection>('cropperSelectionRef')

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

const debouncedSelectionChange = useDebounceFn(() => {
  nextTick(async () => {
    await onGetCropperValue()
  })
}, 500)

function onSelectionChange(e: any) {
  debouncedSelectionChange()
  if (cropperSelectionRef.value)
    return
  initSelectionData.value = e.detail
}

async function onReset() {
  cropperImageRef.value!.$resetTransform()
  cropperImageRef.value!.$center('cover')

  cropperSelectionRef.value!.$change(
    initSelectionData.value?.x,
    initSelectionData.value?.y,
    initSelectionData.value?.width,
    initSelectionData.value?.height,
  )
  cropperSelectionRef.value!.$center()

  await onGetCropperValue()
}

async function onScale(scale: number) {
  if (scale === 1)
    cropperImageRef.value!.$scale(-1, 1)

  if (scale === 2)
    cropperImageRef.value!.$scale(1, -1)

  await onGetCropperValue()
}

async function onRotate(n: string) {
  cropperImageRef.value!.$rotate(n)

  await onGetCropperValue()
}

async function onZoom(n: number) {
  cropperImageRef.value!.$zoom(n)

  await onGetCropperValue()
}

async function onDownload() {
  await onGetCropperValue()

  await downloadByUrl(tempBlobURLCropper.value!)
}

async function onUploadChange() {
  await nextTick()
  srcURL.value = await absImageRef.value?.onGetBlobURL()
  await onGetCropperValue()
}

async function onGetCropperValue() {
  const canvas = await cropperSelectionRef.value?.$toCanvas()

  const base64 = canvas?.toDataURL('image/png')

  const blob = await base64ToBlob(base64)

  await createBlobUrlCropper(blob)

  blobURL.value = tempBlobURLCropper.value
}

defineExpose({
  onGetCropperBlob: () => absImageRef.value?.onGetBlob(),
})

const buttons = [
  {
    icon: 'ant-design:zoom-in-outlined',
    event: () => onZoom(0.1),
    helpMessage: t('comp.cropper.zoomin'),
  },
  {
    icon: 'ant-design:zoom-out-outlined',
    event: () => onZoom(-0.1),
    helpMessage: t('comp.cropper.zoomout'),
  },
  {
    icon: 'mdi:flip-horizontal',
    event: () => onScale(1),
    helpMessage: t('comp.cropper.fliph'),
  },
  {
    icon: 'mdi:flip-vertical',
    event: () => onScale(2),
    helpMessage: t('comp.cropper.flipv'),
  },
  {
    icon: 'ant-design:rotate-right-outlined',
    event: () => onRotate('-45deg'),
    helpMessage: t('comp.cropper.clockwise-rotate'),
  },
  {
    icon: 'ant-design:rotate-left-outlined',
    event: () => onRotate('45deg'),
    helpMessage: t('comp.cropper.anti-clockwise-rotate'),
  },
  {
    icon: 'ant-design:reload-outlined',
    event: () => onReset(),
    helpMessage: t('app.button.reset'),
  },
  {
    icon: 'ant-design:download-outlined',
    event: () => onDownload(),
    helpMessage: t('app.button.download'),
  },
]
</script>

<template>
  <!-- eslint-disable vue/component-name-in-template-casing -->
  <n-grid :x-gap="20" :cols="24">
    <n-gi :span="16">
      <cropper-canvas background :disabled="disabled" style="width: 100%; height: 400px">
        <cropper-image
          v-if="src" ref="cropperImageRef" :src="src" :alt="alt" :rotatable="src" :scalable="src" :skewable="src"
          :translatable="src" crossorigin="anonymous"
        />

        <cropper-shade hidden />

        <cropper-handle action="select" plain />

        <cropper-selection
          :id="selectionId"
          ref="cropperSelectionRef"
          initial-coverage="0.5"
          :movable="src"
          :resizable="src"
          :zoomable="src"
          :keyboard="src"
          :outlined="src"
          @change="onSelectionChange"
        >
          <cropper-grid role="grid" bordered covered />
          <cropper-crosshair centered />

          <cropper-handle action="move" theme-color="rgba(255, 255, 255, 0.35)" />
          <cropper-handle action="n-resize" />
          <cropper-handle action="e-resize" />
          <cropper-handle action="s-resize" />
          <cropper-handle action="w-resize" />
          <cropper-handle action="ne-resize" />
          <cropper-handle action="nw-resize" />
          <cropper-handle action="se-resize" />
          <cropper-handle action="sw-resize" />
        </cropper-selection>
      </cropper-canvas>
    </n-gi>

    <n-gi :span="8" class="vstack">
      <WScrollbar height="330px">
        <n-space vertical size="large">
          <cropper-viewer class="border-1 border-bodyColor" :selection="`#${selectionId}`" style="height: 200px" />

          <n-grid :x-gap="10" :cols="24">
            <n-gi :span="12">
              <cropper-viewer class="border-1 border-bodyColor" :selection="`#${selectionId}`" style="height: 80px" />
            </n-gi>

            <n-gi :span="8">
              <cropper-viewer class="border-1 border-bodyColor" :selection="`#${selectionId}`" style="height: 60px" />
            </n-gi>

            <n-gi :span="4">
              <cropper-viewer class="border-1 border-light-50" :selection="`#${selectionId}`" style="height: 40px" />
            </n-gi>
          </n-grid>
        </n-space>
      </WScrollbar>

      <n-space>
        <WAbsImage ref="absImageRef" @change="onUploadChange">
          <WIconButton
            :icon-props="{ icon: 'ant-design:picture-outlined' }"
            :button-props="{ text: false }"
            tooltip
            :tooltip-msg="t('comp.cropper.choose')"
          />
        </WAbsImage>

        <WIconButton
          v-for="item in buttons"
          :key="item.icon"
          :icon-props="{ icon: item.icon }"
          :button-props="{ text: false, disabled: !src, onClick: item.event }"
          tooltip
          :tooltip-msg="item.helpMessage"
        />
      </n-space>
    </n-gi>
  </n-grid>
</template>
