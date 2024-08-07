<script lang="ts" setup>
import type { UploadFileInfo } from 'naive-ui'

const emits = defineEmits(['change'])

const { createBlobUrl } = useBlob()
const currentFile = shallowRef<Blob>()

async function onUploadChange(options: { file: UploadFileInfo }) {
  currentFile.value = options.file.file!

  emits('change')
}

defineExpose({
  onGetBlobURL: () => createBlobUrl(currentFile.value!),
  onGetBase64: () => blobToBase64(currentFile.value!),
  onGetBlob: () => currentFile.value,
})
</script>

<script lang="ts">
export default defineComponent({
  name: 'AbsImage',
})
</script>

<template>
  <n-upload
    :default-upload="false"
    :show-file-list="false"
    accept=".jpg, .jpeg, .png"
    @change="onUploadChange"
  >
    <slot />
  </n-upload>
</template>
