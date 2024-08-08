<script lang="ts" setup>
defineOptions({
  name: 'LocationPickerDemo',
  defaultView: false,
})

const state = ref({
  location1: [],
  location2: [126.544844, 45.726521],
})
</script>

<template>
  <w-demo-card title="Location Picker based on baidu map">
    <w-JSON :value="state" />

    <n-list>
      <n-list-item>
        <w-title prefix="bar">
          Basic usage
        </w-title>

        <w-location-picker v-model:value="state.location1" />
      </n-list-item>

      <n-list-item>
        <w-title prefix="bar">
          Feedback
        </w-title>

        <w-location-picker v-model:value="state.location2" />
      </n-list-item>
    </n-list>
  </w-demo-card>
</template>
