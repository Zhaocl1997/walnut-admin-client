<script lang="ts" setup>
const state = reactive<Recordable>({})
</script>

<script lang="ts">
export default defineComponent({
  name: 'ColorPickerDemo',

  defaultView: false,
})
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
