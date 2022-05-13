<template>
  <w-demo-card title="Cropper Demo">
    <n-list>
      <n-list-item>
        <w-title prefix="bar">Basic</w-title>

        <WVendorCropper
          src="/assets/auth_bg.jpg"
          alt="cropper-demo"
        ></WVendorCropper>
      </n-list-item>
    </n-list>
  </w-demo-card>
</template>

<script lang="ts" setup>
  import WVendorCropper from '/@/components/Vendor/Cropper'
</script>

<script lang="ts">
  export default defineComponent({
    name: 'CropperDemo',
  })
</script>
