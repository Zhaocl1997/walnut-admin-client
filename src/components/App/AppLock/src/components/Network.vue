<script lang="ts" setup>
const { isOnline, downlink } = useSharedNetwork()

const getIcon = computed(() => {
  if (!isOnline.value)
    return 'carbon:wifi-off'

  return 'carbon:wifi'
})
</script>

<script lang="ts">
export default defineComponent({
  name: 'Network',
})
</script>

<template>
  <n-tooltip trigger="hover">
    <template #trigger>
      <w-icon :icon="getIcon" height="24" color="white" />
    </template>

    <template #default>
      {{ downlink }} Mbps
    </template>
  </n-tooltip>
</template>
