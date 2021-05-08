<script lang="tsx">
  import { useEventListener } from '@vueuse/core'
  import type { PropType } from 'vue'
  import {
    defineComponent,
    ref,
    computed,
    nextTick,
    renderSlot,
    reactive,
    onMounted,
  } from 'vue'

  const toPX = (num?: number | string) => num + 'px'

  export default defineComponent({
    name: 'WVScroll',

    inheritAttrs: false,

    props: {
      data: {
        type: Array as PropType<any[]>,
        default: () => [],
      },
      height: Number as PropType<number>,
      width: Number as PropType<number>,
      itemHeight: Number as PropType<number>,
      bench: {
        type: Number as PropType<number>,
        default: 0,
      },
    },

    emits: [],

    setup(props, ctx) {
      const { slots } = ctx

      const wrapRef = ref<Nullable<HTMLDivElement>>(null)

      const state = reactive({
        first: 0,
        last: 0,
        scrollTop: 0,
      })

      // wrap div style
      const getWrapStyle = computed(() => ({
        height: toPX(props.height),
        width: toPX(props.width),
      }))

      // container div style
      const getContainerStyle = computed(() => ({
        height: toPX(props.data?.length! * props.itemHeight!),
      }))

      const getFirstToRenderRef = computed(() =>
        Math.max(0, state.first - props.bench)
      )

      const getLastToRenderRef = computed(() =>
        Math.min(props.data!?.length, state.last + props.bench)
      )

      const getLast = (first: number): number => {
        const height = props.height ?? wrapRef.value!.clientHeight
        return first + Math.ceil(height / props.itemHeight!)
      }

      const getFirst = (): number => {
        return Math.floor(state.scrollTop / props.itemHeight!)
      }

      const onScroll = () => {
        state.scrollTop = wrapRef.value!.scrollTop
        state.first = getFirst()
        state.last = getLast(state.first)
      }

      nextTick(() => {
        useEventListener(wrapRef, 'scroll', onScroll)
      })

      onMounted(() => {
        state.last = getLast(0)
      })

      // render default slot
      const renderChild = (item: Recordable, index: number) => {
        index += getFirstToRenderRef.value

        const top = toPX(index * props.itemHeight!)

        return (
          <div class="absolute inset-x-0" style={{ top }} key={index}>
            {renderSlot(slots, 'default', { item, index })}
          </div>
        )
      }

      // render content
      const renderChildren = () =>
        props
          .data!?.slice(getFirstToRenderRef.value, getLastToRenderRef.value)
          .map(renderChild)

      return () => (
        <div
          ref={wrapRef}
          style={getWrapStyle.value}
          class="relative block w-full max-w-full overflow-auto flex-auto"
        >
          <div style={getContainerStyle.value} class="block">
            {renderChildren()}
          </div>
        </div>
      )
    },
  })
</script>
