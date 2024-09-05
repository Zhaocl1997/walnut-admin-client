<script lang="ts" setup>
defineOptions({
  name: 'ColorPickerDemo',
  defaultView: false,
})

const state = reactive<Recordable>({})
</script>

<template>
  <w-demo-card title="Color Picker">
    <w-JSON :value="state" height="80px" />

    <n-list>
      <n-list-item>
        <w-title prefix="bar">
          Basic Usage
        </w-title>

        <w-color-picker v-model:value="state.color1" />
      </n-list-item>
    </n-list>
  </w-demo-card>
</template>
