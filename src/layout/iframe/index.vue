<template>
  <div class="h-full w-full">
    <n-spin class="h-full w-full" :show="show">
      <div id="internal-link" class="h-full w-full"></div>
    </n-spin>
  </div>
</template>

<script lang="ts">
  export default defineComponent({
    name: 'Link',
  })
</script>

<script lang="ts" setup>
  import { createIframe, destroyIframe } from './utils'

  const show = ref(false)

  const { currentRoute } = useAppRouter()

  const src = computed(() => currentRoute.value.meta.url)

  const end = () => (show.value = false)

  const init = () => {
    const container = document.getElementById('internal-link')!

    let iframe: HTMLIFrameElement
    iframe = createIframe(container, src.value!, end)

    watchEffect(() => {
      destroyIframe(iframe)
      iframe = createIframe(container, src.value!, end)
    })
  }

  onMounted(() => {
    show.value = true
    init()
  })
</script>

<style lang="scss" scoped>
  :deep(.n-spin-content) {
    height: 100%;
  }
</style>
