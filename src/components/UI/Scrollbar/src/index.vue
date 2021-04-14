<template>
  <el-scrollbar :id="scrollId" ref="scrollRef" noresize>
    <slot />
  </el-scrollbar>
</template>

<script lang="ts">
  import type { SetupContext, PropType } from 'vue'
  import type { WScrollProps } from './types'
  import { defineComponent, ref, unref } from 'vue'

  import { useExpose } from '/@/hooks/core/useExpose'

  import { useScrollCore } from './hooks/useScrollCore'
  import { useVerticalScroll } from './hooks/useVerticalScroll'

  export default defineComponent({
    name: 'WScroll',

    props: {
      vertical: Boolean as PropType<boolean>,
    },

    emits: ['scroll'],

    setup(props: WScrollProps, ctx: SetupContext) {
      const { expose, emit } = ctx

      const scrollRef = ref(null)

      const getScrollRef = () => {
        const scrollbar = unref(scrollRef)
        if (!scrollbar) return
        return { scrollbar }
      }

      const { scrollId } = useVerticalScroll(props, getScrollRef, emit)

      const scrollToMethods = useScrollCore(props, getScrollRef)

      // expose to outside
      useExpose({
        apis: scrollToMethods,
        expose: expose,
      })

      return {
        scrollRef,
        scrollId,
      }
    },
  })
</script>

<style lang="scss" scoped></style>
