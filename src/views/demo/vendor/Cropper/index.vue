<template>
  <w-demo-card title="Cropper Demo">
    <n-list>
      <n-list-item>
        <w-title prefix="bar" class="mb-2">Basic</w-title>

        <img :src="srcValue" alt="cropper demo" class="h-48 w-auto mr-4" />
        <img :src="cropperValue" alt="cropper demo" class="h-48 w-auto" />

        <w-cropper
          v-model:value="cropperValue"
          v-model:src="srcValue"
          alt="cropper-demo"
        ></w-cropper>
      </n-list-item>

      <n-list-item>
        <w-title prefix="bar" class="mb-2">Avatar Upload (OSS)</w-title>

        <w-JSON :value="{ avatar: userProfile.getAvatar }"></w-JSON>

        <w-avatar-upload
          v-model:value="userProfile.getAvatar"
        ></w-avatar-upload>
      </n-list-item>
    </n-list>
  </w-demo-card>
</template>

<script lang="ts" setup>
  const cropperValue = ref()
  const srcValue = ref('/assets/auth_bg.jpg')

  const userProfile = useUserProfileStore()
</script>

<script lang="ts">
  export default defineComponent({
    name: 'CropperDemo',
  })
</script>
