<script lang="ts" setup>
// TODO
// this page open cache, go to other page and back will cause errors
import type { WAvatarUploadInst } from '@/components/Vendor/AvatarUpload'

defineOptions({
  name: 'CropperDemo',
})

const srcValue = ref<string>('/assets/auth_bg.jpg')
const cropperValue = ref<string>()

const avatarCropperUrl = ref<string>()

const avatarUpload = ref<WAvatarUploadInst>()

function onAvatarChange(cropperUrl: string) {
  avatarCropperUrl.value = cropperUrl
}

async function onUploadAvatar() {
  const isAvatarUploadSuccess = await avatarUpload.value?.onOSSUpload()

  if (isAvatarUploadSuccess)
    useAppMsgSuccess()
  else
    useAppMsgInfo('Upload avatar fail')
}
</script>

<template>
  <WDemoCard title="Cropper Demo">
    <n-list>
      <n-list-item>
        <WTitle
          prefix="bar"
          help-message="WCropper has two v-model.
           One is `v-model:value` meaning the cropper blob url.
           The other is `v-model:src` meaning the original image url."
        >
          Basic
        </WTitle>

        <div class="mb-2">
          <WJSON :value="{ srcValue, cropperValue }" />

          <img :src="srcValue" alt="cropper demo" class="mr-4 h-48 w-auto">
          <img :src="cropperValue" alt="cropper demo" class="h-48 w-auto">
        </div>

        <WCropper
          v-model:value="cropperValue"
          v-model:src="srcValue"
          alt="cropper-demo"
        />
      </n-list-item>

      <!-- <n-list-item>
        <WTitle prefix="bar">
          Avatar Upload (OSS)
        </WTitle>

        <WJSON :value="{ avatarCropperUrl }" />

        <w-avatar-upload
          ref="avatarUpload"
          @change="onAvatarChange"
        />

        <n-button class="mt-2" @click="onUploadAvatar">
          Upload
        </n-button>
      </n-list-item> -->
    </n-list>
  </WDemoCard>
</template>
