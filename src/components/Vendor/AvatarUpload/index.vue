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
      display-directive="show"
    >
      <w-cropper
        ref="cropperRef"
        v-model:value="cropperUrl"
        v-model:src="srcUrl"
        alt="Avatar"
        center
      ></w-cropper>
    </w-modal>
  </div>
</template>

<script lang="ts" setup>
  import type { WCropperInst } from '/@/components/Vendor/Cropper'
  import { AliOSSClient } from '../../Vendor/OSSUpload/client'

  const emits = defineEmits(['change'])

  const { t } = useAppI18n()

  const userProfile = useUserProfileStore()
  const userId = userProfile.profile._id!

  const show = ref(false)
  const loading = ref(false)
  const cropperUrl = ref<string>()
  const srcUrl = ref<string>()

  const cropperRef = ref<WCropperInst>()

  onMounted(() => {
    srcUrl.value = userProfile.getAvatar
  })

  const onYes = () => {
    if (cropperUrl.value) {
      emits('change', cropperUrl.value)
    }

    show.value = false
  }

  const onNo = () => {
    show.value = false
    cropperUrl.value = undefined
  }

  const onUpdateShow = (s: boolean) => {
    if (!s) {
      cropperUrl.value = undefined
    }
  }

  const onOSSUpload = async () => {
    if (!cropperUrl.value) {
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

      const file = await cropperRef.value?.onGetCropperBlob()

      const result = await client.put(`avatar/${userId}.png`, file, {
        headers,
      })

      if (result.res.status === 200) {
        emits('change', result.url + `?t=${new Date().getTime()}`)
        return true
      }

      return false
    } finally {
      loading.value = false
    }
  }

  defineExpose({
    onOSSUpload,
  })
</script>

<script lang="ts">
  export default defineComponent({
    name: 'WAvatarUpload',
  })
</script>
