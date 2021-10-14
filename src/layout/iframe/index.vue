<template>
  <div class="h-full w-full">
    <div id="internal-iframe" class="h-full w-full">
      <n-spin :show="show">
        <iframe
          ref="iframeRef"
          :src="src"
          frameborder="0"
          class="h-full w-full"
        ></iframe>
      </n-spin>
    </div>
  </div>
</template>

<script lang="ts">
  export default defineComponent({
    name: 'Link',

    setup() {
      const iframeRef = ref(null)
      const show = ref(false)

      const { currentRoute } = useAppRouter()

      const src = computed(() => currentRoute.value.meta.url)

      onMounted(() => {
        show.value = true
        nextTick(() => {
          ;(iframeRef.value! as any).onload = () => {
            show.value = false
          }
        })
      })

      return {
        iframeRef,
        show,
        src,
      }
    },
  })
</script>

<style lang="scss" scoped></style>
