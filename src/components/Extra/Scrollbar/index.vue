<script lang="tsx">
  import type { PropType } from 'vue'
  import type { ScrollbarInst } from 'naive-ui/lib/_internal'
  import type { WScrollbarRef } from './index'

  import { useExpose } from '/@/hooks/core/useExpose'
  import { genString } from 'easy-fns-ts'

  export default defineComponent({
    name: 'WScrollbar',

    props: {
      modelValue: Number as PropType<number>,
      vertical: Boolean as PropType<boolean>,
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
      const id = ref(genString(8))

      const scrollRef =
        ref<Nullable<ScrollbarInst & { scrollbarInstRef: Recordable }>>(null)

      const onScroll = useDebounceFn((e: WheelEvent) => {
        emit(
          'update:modelValue',
          props.vertical
            ? (e.target as HTMLElement).scrollLeft
            : (e.target as HTMLElement).scrollTop
        )
      }, 300)

      const methods: WScrollbarRef = {
        scrollTo: (opt) => {
          scrollRef.value!.scrollTo({
            ...(opt as any),
            behavior: props.behavior,
          })
        },

        scrollToStart: () => {
          scrollRef.value!.scrollTo({
            position: 'top',
            behavior: props.behavior,
          })
        },

        scrollToEnd: () => {
          scrollRef.value!.scrollTo(
            props.vertical
              ? {
                  left: scrollRef.value!.scrollbarInstRef.containerRef
                    ?.scrollWidth,
                  behavior: props.behavior,
                }
              : {
                  top: scrollRef.value!.scrollbarInstRef.containerRef
                    ?.scrollHeight,
                  behavior: props.behavior,
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
            props.vertical
              ? {
                  left: node['offsetLeft'],
                  behavior: props.behavior,
                }
              : {
                  top: node['offsetTop'],
                  behavior: props.behavior,
                }
          )
        },
      }

      /**
       * @description Capture wheel event so be able to handle x axias scroll
       */
      const onVerticalScroll = (event: WheelEvent) => {
        // get scroll direction
        const detail = (event as any).wheelDelta || event.detail

        // define direction
        const moveForwardStep = 1
        const moveBackStep = -1

        // define step
        let step = 0

        // nagative means scroll to right, positive means scroll to left
        if (detail < 0) {
          step = moveForwardStep * 100
        } else {
          step = moveBackStep * 100
        }

        // move action
        scrollRef.value!.scrollbarInstRef.containerRef.scrollLeft += step

        emit('scroll')
      }

      onMounted(() => {
        props.vertical &&
          useEventListener(
            document.getElementById(id.value),
            'wheel',
            onVerticalScroll,
            {
              passive: true,
              once: false,
              capture: true,
            }
          )
      })

      useExpose({
        apis: methods,
        expose,
      })

      return () => (
        <n-scrollbar
          id={id.value}
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
