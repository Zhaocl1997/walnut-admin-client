<template>
  <w-demo-card title="Icon Picker">
    <w-title prefix="bar">【{{ icon }}】</w-title>

    <w-icon-picker v-model:value="icon"></w-icon-picker>
  </w-demo-card>
</template>

<script lang="ts" setup>
  const icon = ref()
</script>

<script lang="ts">
  export default defineComponent({
    name: 'IconPickerDemo',

    defaultView: false,
  })
</script>
