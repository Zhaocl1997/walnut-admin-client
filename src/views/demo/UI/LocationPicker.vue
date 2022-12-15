<script lang="ts" setup>
const state = ref({
  location1: [],
  location2: [126.544844, 45.726521],
})
</script>

<script lang="ts">
export default defineComponent({
  name: 'LocationPickerDemo',

  defaultView: false,
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
