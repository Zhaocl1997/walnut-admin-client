<script lang="tsx">
import type { ScrollbarInst } from 'naive-ui/lib/_internal'
import { genString } from 'easy-fns-ts'
import type { WScrollbarInst } from './index'

export default defineComponent({
  name: 'WScrollbar',

  props: {
    modelValue: Number as PropType<number>,
    xScrollable: Boolean as PropType<boolean>,
    height: {
      type: String as PropType<string>,
      default: '0',
    },
    width: {
      type: String as PropType<string>,
      default: '100%',
    },
    behavior: {
      type: String as PropType<ScrollBehavior>,
      default: 'smooth',
    },
    elSize: Number as PropType<number>,
    hideScrollbar: Boolean as PropType<boolean>,
  },

  emits: ['update:modelValue', 'scroll'],

  setup(props, { attrs, slots, emit, expose }) {
    const appSettings = useAppStoreSetting()

    const id = ref(genString(8))

    const getBehavior = computed(() =>
      appSettings.app.reducedMotion ? 'auto' : 'smooth',
    )

    const wrapperRef = ref()
    const scrollRef
        = ref<Nullable<ScrollbarInst & { scrollbarInstRef: Recordable }>>(null)
    const isHovered = useElementHover(wrapperRef)

    onMounted(() => {
      // handle hide scrollbar
      if (props.hideScrollbar) {
        const target = wrapperRef.value.querySelector(
            `.w-scrollbar-rail--${
              props.xScrollable ? 'horizontal' : 'vertical'
            }`,
        )

        if (target)
          target.style.display = 'none'
      }
    })

    const onScroll = (e: Event) => {
      emit(
        'update:modelValue',
        props.xScrollable
          ? Number((e.target as HTMLElement).scrollLeft.toFixed(2))
          : Number((e.target as HTMLElement).scrollTop.toFixed(2)),
      )

      emit('scroll')
    }

    watchEffect(() => {
      if (props.xScrollable && isHovered.value) {
        useEventListener(
          wrapperRef,
          'wheel',
          useThrottleFn((e: WheelEvent) => {
            // prevent default wheel
            e.preventDefault()

            const node = scrollRef.value?.scrollbarInstRef?.containerRef

            // @ts-expect-error
            if (e.wheelDelta < 0) {
              scrollRef.value!.scrollTo({
                left: node.scrollLeft + 200,
                behavior: getBehavior.value,
              })
            }
            else {
              scrollRef.value!.scrollTo({
                left: node.scrollLeft - 200,
                behavior: getBehavior.value,
              })
            }

            onScroll(e)
          }, 200),
        )
      }
    })

    const methods: WScrollbarInst = {
      scrollTo: (opt) => {
        scrollRef.value!.scrollTo({
          ...(opt as Object),
          behavior: getBehavior.value,
        })
      },

      scrollToStart: () => {
        scrollRef.value!.scrollTo({
          position: 'top',
          behavior: getBehavior.value,
        })
      },

      scrollToEnd: () => {
        const target = scrollRef.value!.scrollbarInstRef.containerRef

        scrollRef.value!.scrollTo(
          props.xScrollable
            ? {
                left: target?.scrollWidth,
                behavior: getBehavior.value,
              }
            : {
                top: target?.scrollHeight,
                behavior: getBehavior.value,
              },
        )
      },

      scrollToIndex: (index) => {
        if (index < 0)
          return

        const node
            = scrollRef.value?.scrollbarInstRef?.containerRef?.children[0]
              ?.children[index]
            ?? scrollRef.value?.scrollbarInstRef?.containerRef?.children[0]
              ?.children[0]?.children[index]

        scrollRef.value!.scrollTo(
          props.xScrollable
            ? {
                left: node.offsetLeft,
                behavior: getBehavior.value,
              }
            : {
                top: node.offsetTop,
                behavior: getBehavior.value,
              },
        )
      },

      getIsOverflow: () => {
        if (props.xScrollable) {
          return (
            scrollRef.value!.scrollbarInstRef.containerRef.scrollWidth
              > scrollRef.value!.scrollbarInstRef.containerRef.clientWidth
          )
        }
        else {
          return (
            scrollRef.value!.scrollbarInstRef.containerRef.scrollHeight
              > scrollRef.value!.scrollbarInstRef.containerRef.clientHeight
          )
        }
      },
    }

    useExpose({
      apis: methods,
      expose,
    })

    return () => (
        <div ref={wrapperRef} class="w-full h-full">
          <n-scrollbar
            id={id.value}
            ref={scrollRef}
            onScroll={onScroll}
            containerStyle={{
              height: props.height,
              width: props.width,
            }}
            x-scrollable={props.xScrollable}
          >
            {slots}
          </n-scrollbar>
        </div>
    )
  },
})
</script>

<style scoped>
  :deep(.w-scrollbar-content) {
    height: 100% !important;
  }
</style>
