<template>
  <div class="h-full w-full">
    <div id="internal-iframe" class="h-full w-full">
      <iframe
        ref="iframeRef"
        :src="src"
        frameborder="0"
        class="h-full w-full"
      ></iframe>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, computed, ref, onMounted, nextTick } from 'vue'
  import { useLoading } from '/@/hooks/component/useLoading'
  import { useAppRouter } from '/@/router'

  export default defineComponent({
    name: 'Link',

    setup() {
      const iframeRef = ref(null)

      const { currentRoute } = useAppRouter()
      const { startLoading, endLoading } = useLoading({
        target: '#internal-iframe',
      })

      const src = computed(() => currentRoute.value.meta.url)

      onMounted(() => {
        startLoading()
        nextTick(() => {
          iframeRef.value.onload = (e) => {
            setTimeout(() => {
              endLoading()
            }, 1000)
          }
        })
      })

      return {
        iframeRef,
        src,
      }
    },
  })
</script>

<style lang="scss" scoped></style>
