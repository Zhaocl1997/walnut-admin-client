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
      @yes="onYes"
      @no="show = false"
    >
      <WVendorCropper
        v-model:value="cropperValue"
        v-model:src="value"
        alt="Avatar"
        center
      ></WVendorCropper>
    </w-modal>
  </div>
</template>

<script lang="ts" setup>
  import WVendorCropper from '../../Vendor/Cropper'
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
  const userName = user.value.userInfo.username!
  const { AppSuccess } = useAppMsgSuccess()

  const show = ref(false)
  const cropperValue = ref<string>()

  const onYes = async () => {
    const client = await AliOSSClient.instance.getClient()

    const headers = {
      'Cache-Control': 'no-cache',
      'Content-Disposition': encodeURIComponent(userName),
      'x-oss-forbid-overwrite': false,
    }

    const result = await client.put(
      `avatar/${userName}.png`,
      dataURLtoBlob(cropperValue.value!),
      {
        headers,
      }
    )

    if (result.res.status === 200) {
      emits('update:value', result.url + `?t=${new Date().getTime()}`)

      AppSuccess()

      show.value = false
    }
  }
</script>

<script lang="ts">
  export default defineComponent({
    name: 'WAvatarUpload',
  })
</script>
