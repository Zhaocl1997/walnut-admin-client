<template>
  <w-demo-card title="Cropper Demo">
    <n-list>
      <n-list-item>
        <w-title
          prefix="bar"
          help-message="w-cropper has two v-model. \n One is `v-model:value` meaning the cropper base64 data. \n The other is `v-model:src` meaning the full image url."
        >
          Basic
        </w-title>

        <w-JSON :value="{ srcValue, cropperValue }"></w-JSON>

        <img :src="srcValue" alt="cropper demo" class="h-48 w-auto mr-4" />
        <img :src="cropperValue" alt="cropper demo" class="h-48 w-auto" />

        <w-cropper
          v-model:value="cropperValue"
          v-model:src="srcValue"
          alt="cropper-demo"
        ></w-cropper>
      </n-list-item>

      <n-list-item>
        <w-title prefix="bar">Avatar Upload (OSS)</w-title>

        <w-JSON :value="{ avatarCropperUrl: avatarCropperUrl }"></w-JSON>

        <w-avatar-upload
          ref="avatarUpload"
          @change="onAvatarChange"
        ></w-avatar-upload>

        <n-button @click="onUploadAvatar" class="mt-2">Upload</n-button>
      </n-list-item>
    </n-list>
  </w-demo-card>
</template>

<script lang="ts" setup>
  // TODO
  // this page open cache, go to other page and back will cause errors
  import type { WAvatarUploadInst } from '@/components/Vendor/AvatarUpload'

  const srcValue = ref<string>('/assets/auth_bg.jpg')
  const cropperValue = ref<string>()

  const avatarCropperUrl = ref<string>()

  const avatarUpload = ref<WAvatarUploadInst>()

  const onAvatarChange = (cropperUrl: string) => {
    avatarCropperUrl.value = cropperUrl
  }

  const onUploadAvatar = async () => {
    const isAvatarUploadSuccess = await avatarUpload.value?.onOSSUpload()

    if (isAvatarUploadSuccess) {
      useAppMsgSuccess()
    } else {
      useAppMsgInfo('Upload avatar fail')
    }
  }
</script>

<script lang="ts">
  export default defineComponent({
    name: 'CropperDemo',
  })
</script>
