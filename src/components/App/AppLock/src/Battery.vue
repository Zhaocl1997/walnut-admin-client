<template>
  <n-tooltip trigger="hover">
    <template #trigger>
      <w-icon :icon="getIcon" height="24" color="white"></w-icon>
    </template>

    <template #default> {{ getPercentLevel }} % </template>
  </n-tooltip>
</template>

<script lang="ts" setup>
  const { level, charging } = useBattery()

  const getPercentLevel = computed(() => level.value * 100)

  const getIcon = computed(() => {
    if (charging.value) {
      return 'carbon:battery-charging'
    }

    if (getPercentLevel.value <= 5) {
      return 'carbon:battery-empty'
    }

    if (getPercentLevel.value > 5 && getPercentLevel.value < 35) {
      return 'carbon:battery-low'
    }

    if (getPercentLevel.value > 35 && getPercentLevel.value < 65) {
      return 'carbon:battery-quarter'
    }

    if (getPercentLevel.value > 65 && getPercentLevel.value < 95) {
      return 'carbon:battery-half'
    }

    if (getPercentLevel.value >= 95) {
      return 'carbon:battery-full'
    }
  })
</script>

<script lang="ts">
  export default defineComponent({
    name: 'Battery',
  })
</script>
