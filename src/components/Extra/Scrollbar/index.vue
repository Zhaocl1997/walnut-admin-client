<script lang="tsx">
  import type { ScrollbarInst } from 'naive-ui/lib/_internal'
  import type { WScrollbarInst } from './index'

  import { useExpose } from '@/hooks/core/useExpose'
  import { genString } from 'easy-fns-ts'

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
    },

    emits: ['update:modelValue', 'scroll'],

    setup(props, { attrs, slots, emit, expose }) {
      const appSettings = useAppStoreSetting()

      const id = ref(genString(8))
      const isOverflow = ref(false)

      const getBehavior = computed(() =>
        appSettings.settings.app.reducedMotion ? 'auto' : 'smooth'
      )

      const scrollRef =
        ref<Nullable<ScrollbarInst & { scrollbarInstRef: Recordable }>>(null)

      const onScroll = (e: Event) => {
        emit(
          'update:modelValue',
          props.xScrollable
            ? Number((e.target as HTMLElement).scrollLeft.toFixed(2))
            : Number((e.target as HTMLElement).scrollTop.toFixed(2))
        )

        if (props.xScrollable) {
          isOverflow.value =
            (e.target as HTMLElement).scrollWidth >
            (e.target as HTMLElement).clientWidth
        } else {
          isOverflow.value =
            (e.target as HTMLElement).scrollHeight >
            (e.target as HTMLElement).clientHeight
        }

        emit('scroll', isOverflow.value)
      }

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
          scrollRef.value!.scrollTo(
            props.xScrollable
              ? {
                  left: scrollRef.value!.scrollbarInstRef.containerRef
                    ?.scrollWidth,
                  behavior: getBehavior.value,
                }
              : {
                  top: scrollRef.value!.scrollbarInstRef.containerRef
                    ?.scrollHeight,
                  behavior: getBehavior.value,
                }
          )
        },

        scrollToIndex: (index) => {
          if (index < 0) return

          const node =
            scrollRef.value?.scrollbarInstRef?.containerRef?.children[0]
              ?.children[index] ??
            scrollRef.value?.scrollbarInstRef?.containerRef?.children[0]
              ?.children[0]?.children[index]

          scrollRef.value!.scrollTo(
            props.xScrollable
              ? {
                  left: node['offsetLeft'],
                  behavior: getBehavior.value,
                }
              : {
                  top: node['offsetTop'],
                  behavior: getBehavior.value,
                }
          )
        },

        getIsOverflow: () => {
          return isOverflow.value
        },
      }

      useExpose({
        apis: methods,
        expose,
      })

      return () => (
        <div class="w-full h-full">
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
