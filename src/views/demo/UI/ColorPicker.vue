<template>
  <w-demo-card title="Color Picker">
    <w-JSON :value="state" height="80px"></w-JSON>

    <n-list>
      <n-list-item>
        <w-title prefix="bar">Basic Usage</w-title>

        <w-color-picker v-model:value="state.color1"></w-color-picker>
      </n-list-item>
    </n-list>
  </w-demo-card>
</template>

<script lang="ts" setup>
  const state = reactive<Recordable>({})
</script>

<script lang="ts">
  export default defineComponent({
    name: 'ColorPickerDemo',

    defaultView: false,
  })
</script>
