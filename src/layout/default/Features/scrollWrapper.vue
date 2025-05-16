<script lang="ts" setup>
defineOptions({
  name: 'TheAppContentScrollWrapper',
})

const scrollWrapper = useAppScroll()

const appSetting = useAppStoreSetting()
</script>

<template>
  <div
    ref="scrollWrapper"
    class="overflow-auto transition-height transition-width"
    :style="{ width: `calc(100vw - ${appSetting.getMenuWidth}px)`, height: `calc(100vh - ${appSetting.getCalcHeight}px)` }"
  >
    <slot />
  </div>
</template>
