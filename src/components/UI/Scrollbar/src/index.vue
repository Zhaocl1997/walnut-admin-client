<script lang="tsx">
  import type { WScrollProps, ElScrollbarRef } from './types'

  import { defineComponent, ref, computed, renderSlot } from 'vue'
  import { easyOmit } from 'easy-fns-ts'

  import { useExpose } from '/@/hooks/core/useExpose'

  import { useScrollCore } from './hooks/useScrollCore'
  import { useVerticalScroll } from './hooks/useVerticalScroll'
  import { useScrollPosition } from './hooks/useScrollPosition'

  import props, { extendPropKeys } from './props'

  export default defineComponent({
    name: 'WScroll',

    inheritAttrs: false,

    props: props,

    emits: ['scroll', 'update:modelValue'],

    setup(props: WScrollProps, ctx) {
      const { expose, emit, attrs, slots } = ctx

      const scrollRef = ref<Nullable<ElScrollbarRef>>(null)

      const getBindValue = computed(() => ({
        ...attrs,
        ...easyOmit(props, extendPropKeys),
      }))

      const { onScroll } = useScrollPosition(props, emit)

      const { scrollId } = useVerticalScroll(props, scrollRef, emit)

      const scrollToMethods = useScrollCore(props, scrollRef)

      // expose to outside
      useExpose({
        apis: scrollToMethods,
        expose: expose,
      })

      return () => (
        <el-scrollbar
          id={scrollId.value}
          ref={scrollRef}
          {...getBindValue.value}
          noresize
          onScroll={onScroll}
        >
          {renderSlot(slots, 'default')}
        </el-scrollbar>
      )
    },
  })
</script>
