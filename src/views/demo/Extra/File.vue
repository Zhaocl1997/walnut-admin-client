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

<template>
  <w-demo-card title="Common file operations, download/transform">
    <n-list>
      <n-list-item>
        <w-title prefix="bar">
          Abstract image
        </w-title>

        <n-space vertical>
          <w-abs-image ref="absImageRef" @change="hasFile = true">
            <n-button>Choose Image</n-button>
            {{ hasFile ? 'Got image' : 'No image yet' }}
          </w-abs-image>

          <n-input
            v-model:value="fileName"
            placeholder="download file name"
          />

          <n-space>
            <n-button :disabled="!hasFile" @click="onDownloadByUrl">
              download by url
            </n-button>

            <n-button :disabled="!hasFile" @click="onDownloadBybase64">
              download by base64
            </n-button>

            <n-button :disabled="!hasFile" @click="onDownloadByBlob">
              download by blob
            </n-button>

            <n-space vertical>
              <n-button :disabled="!hasFile" @click="onRenderBase64">
                render base64
              </n-button>

              <n-image
                v-if="base64"
                :src="base64"
                alt="base64 render"
                class="h-48 w-48"
              />
            </n-space>

            <n-space vertical>
              <n-button :disabled="!hasFile" @click="onRenderBlobURL">
                render blobURL
              </n-button>

              <n-image
                v-if="blobURL"
                :src="blobURL"
                alt="blobURL render"
                class="h-48 w-48"
              />
            </n-space>
          </n-space>
        </n-space>
      </n-list-item>
    </n-list>
  </w-demo-card>
</template>
