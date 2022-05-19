<template>
  <n-watermark
    :content="appSetting.settings.app.watermarkContent"
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
  />
</template>

<script lang="ts" setup>
  const appSetting = useAppSettingStore()
</script>

<script lang="ts">
  export default defineComponent({
    name: 'AppWatermark',
  })
</script>
