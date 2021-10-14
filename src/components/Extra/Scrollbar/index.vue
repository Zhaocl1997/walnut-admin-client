<script lang="tsx">
  import type { PropType } from 'vue'
  import type { ScrollbarInst } from 'naive-ui'

  import { useExpose } from '/@/hooks/core/useExpose'

  type ScrollBarMode = 'horizontal' | 'vertical'

  enum ScrollModeEnum {
    HORIZONTAL = 'horizontal',
    VERTICAL = 'vertical',
  }

  enum ScrollPropEnum {
    SCROLLTOP = 'scrollTop',
    SCROLLLEFT = 'scrollLeft',
  }

  enum ScrollFieldEnum {
    OFFSETLEFT = 'offsetLeft',
    OFFSETTOP = 'offsetTop',
  }

  export default defineComponent({
    name: 'WScrollbar',

    props: {
      modelValue: Number as PropType<number>,
      vertical: Boolean as PropType<boolean>,
      height: {
        type: String as PropType<string>,
        default: '500px',
      },
      width: {
        type: String as PropType<string>,
        default: '100%',
      },
      behavior: {
        type: String as PropType<ScrollBehavior>,
        default: 'smooth',
      },
    },

    emits: ['update:modelValue'],

    setup(props, { attrs, slots, emit, expose }) {
      const scrollRef = ref<Nullable<ScrollbarInst>>(null)

      const field = props.vertical
        ? ScrollFieldEnum.OFFSETLEFT
        : ScrollFieldEnum.OFFSETTOP

      const onScroll = useDebounceFn((e: WheelEvent) => {
        emit(
          'update:modelValue',
          props.vertical
            ? (e.target as HTMLElement).scrollLeft
            : (e.target as HTMLElement).scrollTop
        )
      }, 300)

      const methods = {
        scrollTo: (opt: any) => {
          scrollRef.value?.scrollTo({ ...opt, behavior: props.behavior })
        },

        scrollToStart: () => {
          scrollRef.value!.scrollTo(
            props.vertical
              ? { left: 0, behavior: props.behavior }
              : { top: 0, behavior: props.behavior }
          )
        },

        scrollToEnd: () => {
          scrollRef.value!.scrollTo(
            props.vertical
              ? {
                  left: scrollRef.value!.containerRef?.scrollWidth,
                  behavior: props.behavior,
                }
              : {
                  top: scrollRef.value!.containerRef?.scrollHeight,
                  behavior: props.behavior,
                }
          )
        },

        scrollToIndex: (index: number) => {
          if (index <= 0) return

          if (props.vertical) {
            let val = 0

            // TODO
            // stupid way currently
            try {
              val =
                scrollRef.value!.containerRef!.children[0]?.children[index - 1][
                  field
                ]
            } catch (e) {
              console.log(index)

              val =
                scrollRef.value!.containerRef!.children[0]?.children[0]
                  ?.children[index - 1][field]
            }

            scrollRef.value?.scrollTo({ left: val, behavior: props.behavior })

            return
          }

          scrollRef.value!.scrollTo({
            index: index - 1,
            elSize: 48,
            behavior: props.behavior,
          })
        },
      }

      useExpose({
        apis: methods,
        expose,
      })

      return () => (
        <n-scrollbar
          ref={scrollRef}
          onScroll={onScroll}
          containerStyle={{
            height: props.height,
            width: props.width,
          }}
          x-scrollable={props.vertical}
        >
          {slots}
        </n-scrollbar>
      )
    },
  })
</script>
