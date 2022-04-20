<template>
  <div>
    <n-button
      v-if="image"
      @click="onUpload"
      :disabled="getUploadDisabled"
      :loading="getUploadLoading"
      class="mb-2"
    >
      上传文件
    </n-button>

    <n-upload
      :abstract="!image"
      ref="uploadRef"
      v-model:file-list="listRef"
      :custom-request="onCustomRequest"
      :default-upload="false"
      show-download-button
      @download="onDownload"
      @remove="onRemove"
      @update:file-list="onFileListChange"
      @before-upload="onBeforeUpload"
      :list-type="image ? 'image-card' : undefined"
      :disabled="disabled"
      :max="max"
      :accept="image ? '.jpg, .jpeg, .png' : accept"
      multiple
    >
      <template v-if="image">
        <w-icon icon="ant-design:plus-outlined"></w-icon>
      </template>

      <template v-else>
        <n-space size="small">
          <n-upload-trigger #="{ handleClick }" abstract>
            <n-button @click="handleClick" :disabled="getChooseDisabled">
              选择文件
            </n-button>
          </n-upload-trigger>

          <n-button
            @click="onUpload"
            :disabled="getUploadDisabled"
            :loading="getUploadLoading"
          >
            {{ getUploadLoading ? '上传中...' : '上传文件' }}
          </n-button>
        </n-space>

        <div class="mt-2">
          <n-upload-file-list />
        </div>
      </template>
    </n-upload>
  </div>
</template>

<script lang="ts" setup>
  import type {
    UploadFileInfo,
    UploadCustomRequestOptions,
    UploadInst,
  } from 'naive-ui'

  import { genString } from 'easy-fns-ts'
  import { downloadByUrl } from '../../../utils/file/download'
  import { onAliOSSClient } from './ali-oss'

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
    crossoverSize: 1024 * 10,
  })
  const emits = defineEmits(['update:value'])

  const uploadRef = ref<Nullable<UploadInst>>(null)
  const listRef = ref<UploadFileInfo[]>()

  const getChooseDisabled = computed(
    () => props.disabled || (listRef.value && listRef.value.length >= props.max)
  )

  const getUploadDisabled = computed(
    () =>
      props.disabled ||
      !listRef.value ||
      listRef.value.length === 0 ||
      listRef.value.every(({ status }) => status === 'finished') ||
      getUploadLoading.value
  )

  const getUploadLoading = computed(
    () =>
      listRef.value &&
      listRef.value.some(({ status }) => status === 'uploading')
  )

  watch(
    () => listRef.value,
    (val) => {
      if (!val) return

      emits(
        'update:value',
        val.filter((i) => i.status === 'finished').map((item) => item.name)
      )
    },
    { immediate: true, deep: true }
  )

  const {
    AliOSSUpload,
    AliOSSMultiUpload,
    AliOSSAbortMultipartUpload,
    onGetFullUrl,
  } = onAliOSSClient(props.region, props.bucket, props.folder)

  const onCustomRequest = ({
    file,
    data,
    headers,
    withCredentials,
    action,
    onFinish,
    onError,
    onProgress,
  }: UploadCustomRequestOptions) => {
    const formData = new FormData()

    // if (data) {
    //   Object.keys(data).forEach((key) => {
    //     formData.append(
    //       key,
    //       data[key as keyof UploadCustomRequestOptions['data']]
    //     )
    //   })
    // }

    formData.append(file.name, file.file)
    ;(file.file.size <= props.crossoverSize * 1024
      ? AliOSSUpload(file)
      : AliOSSMultiUpload(file, onProgress)
    )
      .then(({ id, value }) => {
        onFinish()

        const index = listRef.value.findIndex((i) => i.id === id)

        if (index !== -1) {
          listRef.value[index].url = onGetFullUrl(value)
        }
      })
      .catch(() => {
        onError()
      })
  }

  const onRemove = async (data: {
    file: UploadFileInfo
    fileList: UploadFileInfo[]
  }) => {
    const index = listRef.value.findIndex((i) => i.id === data.file.id)

    if (index !== -1) {
      listRef.value.splice(index, 1)

      await AliOSSAbortMultipartUpload()
    }
  }

  const onFileListChange = (fileList: UploadFileInfo[]) => {
    listRef.value = fileList
  }

  const onUpload = (e: Event) => {
    e.preventDefault()
    e.stopPropagation()
    e.stopImmediatePropagation()
    uploadRef.value?.submit()
  }

  const onDownload = (file: UploadFileInfo) => {
    downloadByUrl({ url: file.url, fileName: file.name })
  }

  const onBeforeUpload = (data: {
    file: UploadFileInfo
    fileList: UploadFileInfo[]
  }) => {
    if (data.file.file.size / 1024 > props.size) {
      useAppMessage().error(
        `File size should not be more than ${props.size / 1024}M`
      )
      return false
    }

    return true
  }

  onMounted(() => {
    listRef.value = props.value?.map((i) => ({
      id: genString(8),
      name: i,
      status: 'finished',
      url: onGetFullUrl(`${props.folder}/${i}`),
    }))
  })
</script>

<script lang="ts">
  export default defineComponent({
    name: 'WVendorAliOSSUpload',

    inheritAttrs: false,
  })
</script>
