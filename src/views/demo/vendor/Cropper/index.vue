<script lang="ts" setup>
defineOptions({
  name: 'CropperDemo',
})

const srcValue = ref<string>('/assets/auth_bg.jpg')
const cropperValue = ref<string>()
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
    </n-list>
  </WDemoCard>
</template>
