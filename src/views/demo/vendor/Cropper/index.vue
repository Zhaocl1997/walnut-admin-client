<template>
  <w-demo-card title="Cropper Demo">
    <n-list>
      <n-list-item>
        <w-title prefix="bar" class="mb-2">Basic</w-title>

        <img :src="srcValue" alt="cropper demo" class="h-48 w-auto mr-4" />
        <img :src="cropperValue" alt="cropper demo" class="h-48 w-auto" />

        <WVendorCropper
          v-model:value="cropperValue"
          v-model:src="srcValue"
          alt="cropper-demo"
        ></WVendorCropper>
      </n-list-item>

      <n-list-item>
        <w-title prefix="bar" class="mb-2">Avatar Upload (OSS)</w-title>

        <w-JSON :value="{ avatar: user.userInfo.avatar }"></w-JSON>

        <WAvatarUplaod v-model:value="user.userInfo.avatar"></WAvatarUplaod>
      </n-list-item>
    </n-list>
  </w-demo-card>
</template>

<script lang="ts" setup>
  import WVendorCropper from '/@/components/Vendor/Cropper'
  import WAvatarUplaod from '/@/components/Extra/AvatarUpload'

  const cropperValue = ref()
  const srcValue = ref('/assets/auth_bg.jpg')

  const { user } = useAppState()
</script>

<script lang="ts">
  export default defineComponent({
    name: 'CropperDemo',
  })
</script>
