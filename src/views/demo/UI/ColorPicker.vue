<script lang="ts" setup>
defineOptions({
  name: 'ColorPickerDemo',
  defaultView: false,
})

const state = reactive<Recordable>({})
</script>

<template>
  <WDemoCard title="Color Picker">
    <WJSON :value="state" height="80px" />

    <n-list>
      <n-list-item>
        <WTitle prefix="bar">
          Basic Usage
        </WTitle>

        <w-color-picker v-model:value="state.color1" />
      </n-list-item>
    </n-list>
  </WDemoCard>
</template>
