<template>
  <div class="h-full w-full">
    <n-spin class="h-full w-full" :show="show">
      <iframe
        :src="frameSrc ?? $route.meta.url"
        class="h-full w-full"
        frameborder="0"
        @load="end"
      ></iframe>
    </n-spin>
  </div>
</template>

<script lang="ts">
  export default defineComponent({
    name: 'WIFrame',
  })
</script>

<script lang="ts" setup>
  const props = defineProps<{ frameSrc?: string }>()

  const show = ref(false)

  const end = () => (show.value = false)

  onMounted(() => {
    show.value = true
  })
</script>

<style lang="scss" scoped>
  :deep(.n-spin-content) {
    height: 100%;
  }
</style>
