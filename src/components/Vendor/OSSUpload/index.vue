<script lang="ts" setup>
import type {
  UploadCustomRequestOptions,
  UploadFileInfo,
  UploadInst,
} from 'naive-ui'

import { genString } from 'easy-fns-ts'
import { AliOSSClient } from './client'

// TODO 888
interface InternerProps {
  value?: string[]
  region?: string
  bucket?: string
  folder?: string
  image?: boolean
  disabled?: boolean
  max?: number
  accept?: string
  // KB
  size?: number
  // KB, file size to decide whether to use multipart upload
  crossoverSize?: number
}

const props = withDefaults(defineProps<InternerProps>(), {
  region: 'oss-cn-beijing',
  bucket: 'walnut-demo',
  folder: 'example',
  max: 10,
  size: 1024 * 10,
  crossoverSize: 1024 * 30,
})
const emits = defineEmits(['update:value'])

const { t } = useAppI18n()

const uploadRef = ref<Nullable<UploadInst>>(null)
const listRef = ref<UploadFileInfo[]>()

const getChooseDisabled = computed(
  () => props.disabled || (listRef.value && listRef.value.length >= props.max),
)

const getUploadDisabled = computed(
  () =>
    props.disabled
    || !listRef.value
    || listRef.value.length === 0
    || listRef.value.every(({ status }) => status === 'finished')
    || getUploadLoading.value,
)

const getUploadLoading = computed(
  () =>
    listRef.value
    && listRef.value.some(({ status }) => status === 'uploading'),
)

watch(
  () => listRef.value,
  (val) => {
    if (!val)
      return

    emits(
      'update:value',
      val.filter(i => i.status === 'finished').map(item => item.name),
    )
  },
  { immediate: true, deep: true },
)

function onCustomRequest({
  file,
  data,
  headers,
  withCredentials,
  action,
  onFinish,
  onError,
  onProgress,
}: UploadCustomRequestOptions) {
  const formData = new FormData()

  // if (data) {
  //   Object.keys(data).forEach((key) => {
  //     formData.append(
  //       key,
  //       data[key as keyof UploadCustomRequestOptions['data']]
  //     )
  //   })
  // }

  formData.append(file.name, file.file!)
  ;(file.file!.size <= props.crossoverSize * 1024
    ? AliOSSClient.instance.upload(file, props.folder)
    : AliOSSClient.instance.multiUpload(file, props.folder, onProgress)
  )
    .then((data) => {
      const { id, value } = data!

      onFinish()

      const index = listRef.value!.findIndex(i => i.id === id)

      if (index !== -1)
        listRef.value![index].url = AliOSSClient.instance.getFullUrl(value)
    })
    .catch(() => {
      onError()
    })
}

async function onRemove(data: {
  file: UploadFileInfo
  fileList: UploadFileInfo[]
}) {
  const index = listRef.value!.findIndex(i => i.id === data.file.id)

  if (index !== -1) {
    listRef.value!.splice(index, 1)

    await AliOSSClient.instance.abortMultipartUpload()
  }
}

function onFileListChange(fileList: UploadFileInfo[]) {
  listRef.value = fileList
}

function onUpload(e: Event) {
  e.preventDefault()
  e.stopPropagation()
  e.stopImmediatePropagation()
  uploadRef.value?.submit()
}

function onDownload(file: UploadFileInfo) {
  downloadByUrl(file.url!, file.name)
}

function onBeforeUpload(data: {
  file: UploadFileInfo
  fileList: UploadFileInfo[]
}) {
  if (data.file.file!.size / 1024 > props.size) {
    useAppMessage().error(
        `File size should not be more than ${props.size / 1024}M`,
    )
    return false
  }

  return true
}

onMounted(() => {
  setTimeout(() => {
    listRef.value = props.value?.map(i => ({
      id: genString(8),
      name: i,
      status: 'finished',
      url: AliOSSClient.instance.getFullUrl(`${props.folder}/${i}`),
    }))
  }, 500)
})
</script>

<script lang="ts">
export default defineComponent({
  name: 'WVendorOSSUpload',

  inheritAttrs: false,
})
</script>

<template>
  <div>
    <n-button
      v-if="image"
      :disabled="getUploadDisabled"
      :loading="getUploadLoading"
      class="mb-2"
      @click="onUpload"
    >
      {{ t('comp.alioss.upload') }}
    </n-button>

    <n-upload
      ref="uploadRef"
      v-model:file-list="listRef"
      :abstract="!image"
      :custom-request="onCustomRequest"
      :default-upload="false"
      show-download-button
      :list-type="image ? 'image-card' : undefined"
      :disabled="disabled"
      :max="max"
      :accept="image ? '.jpg, .jpeg, .png' : accept"
      multiple
      @download="onDownload"
      @remove="onRemove"
      @update:file-list="onFileListChange"
      @before-upload="onBeforeUpload"
    >
      <template v-if="image">
        <w-icon icon="ant-design:plus-outlined" />
      </template>

      <template v-else>
        <n-space size="small">
          <n-upload-trigger #="{ handleClick }" abstract>
            <n-button :disabled="getChooseDisabled" @click="handleClick">
              {{ t('comp.alioss.choose') }}
            </n-button>
          </n-upload-trigger>

          <n-button
            :disabled="getUploadDisabled"
            :loading="getUploadLoading"
            @click="onUpload"
          >
            {{
              getUploadLoading
                ? t('comp.alioss.uploading')
                : t('comp.alioss.upload')
            }}
          </n-button>
        </n-space>

        <div class="mt-2">
          <n-upload-file-list />
        </div>
      </template>
    </n-upload>
  </div>
</template>
