<template>
  <w-demo-card title="Common file operations, download/transform">
    <n-list>
      <n-list-item>
        <w-title prefix="bar">Abstract image</w-title>

        <n-space vertical>
          <w-abs-image ref="absImageRef" @change="hasFile = true">
            <n-button>Choose Image</n-button>
            {{ hasFile ? 'Got image' : 'No image yet' }}
          </w-abs-image>

          <n-input
            v-model:value="fileName"
            placeholder="download file name"
          ></n-input>

          <n-space>
            <n-button @click="onDownloadByUrl" :disabled="!hasFile">
              download by url
            </n-button>

            <n-button @click="onDownloadBybase64" :disabled="!hasFile">
              download by base64
            </n-button>

            <n-button @click="onDownloadByBlob" :disabled="!hasFile">
              download by blob
            </n-button>

            <n-space vertical>
              <n-button @click="onRenderBase64" :disabled="!hasFile">
                render base64
              </n-button>

              <n-image
                v-if="base64"
                :src="base64"
                alt="base64 render"
                class="h-48 w-48"
              ></n-image>
            </n-space>

            <n-space vertical>
              <n-button @click="onRenderBlobURL" :disabled="!hasFile">
                render blobURL
              </n-button>

              <n-image
                v-if="blobURL"
                :src="blobURL"
                alt="blobURL render"
                class="h-48 w-48"
              ></n-image>
            </n-space>
          </n-space>
        </n-space>
      </n-list-item>
    </n-list>
  </w-demo-card>
</template>

<script lang="ts" setup>
  import type { WAbsImageInst } from '@/components/Extra/AbsImage'

  const blobURL = ref<string>()
  const base64 = ref<string>()
  const hasFile = ref(false)
  const fileName = ref<string>()

  const absImageRef = ref<WAbsImageInst>()

  const onRenderBlobURL = async () => {
    const res = await absImageRef.value.onGetBlobURL()
    blobURL.value = res
  }

  const onRenderBase64 = async () => {
    const res = await absImageRef.value.onGetBase64()
    base64.value = res
  }

  const onDownloadByUrl = async () => {
    await downloadByUrl(blobURL.value, fileName.value)
  }

  const onDownloadBybase64 = async () => {
    await downloadByBase64(base64.value, fileName.value)
  }

  const onDownloadByBlob = async () => {
    const blob = absImageRef.value.onGetBlob()
    await downloadByBlob(blob, fileName.value)
  }
</script>

<script lang="ts">
  export default defineComponent({
    name: 'FileDemo',

    defaultView: false,
  })
</script>
