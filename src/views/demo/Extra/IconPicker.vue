<template>
  <w-demo-card title="Icon Picker">
    <n-list>
      <n-list-item>
        <w-title prefix="bar">【{{ icon }}】</w-title>

        <w-icon-picker v-model:value="icon"></w-icon-picker>
      </n-list-item>

      <n-list-item>
        <w-title prefix="bar">【{{ icon2 }}】</w-title>

        <w-icon-picker v-model:value="icon2"></w-icon-picker>
      </n-list-item>

      <n-list-item>
        <w-title prefix="bar">【{{ icon3 }}】</w-title>

        <w-icon-picker v-model:value="icon3" preset="icon"></w-icon-picker>
      </n-list-item>
    </n-list>
  </w-demo-card>
</template>

<script lang="ts" setup>
  const icon = ref()
  const icon2 = ref('carbon:collapse-all')
  const icon3 = ref('emojione-v1:flag-for-china')
</script>

<script lang="ts">
  export default defineComponent({
    name: 'IconPickerDemo',

    defaultView: false,
  })
</script>
