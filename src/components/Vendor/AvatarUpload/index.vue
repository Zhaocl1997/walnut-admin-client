<template>
  <div>
    <n-button @click="show = true">
      {{ t('comp:avatar-upload:button') }}
    </n-button>

    <w-modal
      v-model:show="show"
      :title="t('comp:avatar-upload:title')"
      width="800px"
      :auto-focus="false"
      :loading="loading"
      @yes="onYes"
      @no="onNo"
      @update:show="onUpdateShow"
    >
      <w-cropper
        v-model:value="cropperValue"
        v-model:src="value"
        alt="Avatar"
        center
      ></w-cropper>
    </w-modal>
  </div>
</template>

<script lang="ts" setup>
  import { AliOSSClient } from '../../Vendor/OSSUpload/client'
  import { dataURLtoBlob } from '/@/utils/file/base64'

  // TODO 888
  interface InternalProps {
    value: string
  }

  const props = defineProps<InternalProps>()
  const emits = defineEmits(['update:value'])

  const { t } = useAppI18n()

  const { user } = useAppState()
  const userId = user.value.userInfo._id!

  const show = ref(false)
  const loading = ref(false)
  const cropperValue = ref<string>()

  const onYes = () => {
    if (cropperValue.value) {
      const tempUrl = window.URL.createObjectURL(
        dataURLtoBlob(cropperValue.value!)
      )

      emits('update:value', tempUrl)
    }

    show.value = false
  }

  const onNo = () => {
    show.value = false
    cropperValue.value = undefined
  }

  const onUpdateShow = (s: boolean) => {
    if (!s) {
      cropperValue.value = undefined
    }
  }

  const onSubmit = async () => {
    if (!cropperValue.value) {
      return
    }

    loading.value = true

    try {
      const client = await AliOSSClient.instance.getClient()

      const headers = {
        'Cache-Control': 'no-cache',
        'Content-Disposition': encodeURIComponent(userId),
        'x-oss-forbid-overwrite': false,
      }

      const result = await client.put(
        `avatar/${userId}.png`,
        dataURLtoBlob(cropperValue.value!),
        {
          headers,
        }
      )

      if (result.res.status === 200) {
        emits('update:value', result.url + `?t=${new Date().getTime()}`)
      }
    } finally {
      loading.value = false
    }
  }

  defineExpose({
    onSubmit,
  })
</script>

<script lang="ts">
  export default defineComponent({
    name: 'WAvatarUpload',
  })
</script>
