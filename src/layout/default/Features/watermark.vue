<template>
  <n-watermark
    v-if="appSetting.getShowGlobalWatermark"
    :content="appSetting.app.watermarkContent"
    cross
    fullscreen
    :font-size="16"
    :line-height="16"
    :width="196"
    :height="196"
    :rotate="-15"
    :x-offset="12"
    :y-offset="60"
    :z-index="999999"
  ></n-watermark>
</template>

<script lang="ts" setup>
  const appSetting = useAppStoreSetting()
</script>

<script lang="ts">
  export default defineComponent({
    name: 'TheAppWatermark',
  })
</script>
