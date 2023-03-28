import { upperFirst } from 'easy-fns-ts'
import { isNumber } from 'lodash-es'
import { Transition, TransitionGroup, renderSlot } from 'vue'

export type TransitionMode = 'in-out' | 'out-in'

const props = {
  name: {
    type: String as PropType<Nullable<ValueOfAppConstTransitionName>>,
    default: 'fade',
  },
  mode: {
    type: String as PropType<TransitionMode>,
    default: 'out-in',
  },
  group: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
  appear: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
  duration: {
    type: [Number, Object] as PropType<
      | number
      | {
        enter: number
        leave: number
      }
    >,
    default: 300,
  },
} as const

export type WTransitionProps = ExtractPropTypes<typeof props>

export default defineComponent({
  name: 'WTransition',

  inheritAttrs: false,

  props,

  setup(props, { slots }) {
    const getActiveClass = (m: 'In' | 'Out') => {
      const isDash = props.name?.includes('-')
      if (isDash) {
        return (
          props.name?.split('-')[0] + m + upperFirst(props.name?.split('-')[1]!)
        )
      }
      return props.name + m
    }

    const getDurationSeconds = () =>
      (isNumber(props.duration) ? props.duration : props.duration.enter) / 1000

    const onBeforeEnter = (el: Element) => {
      // @ts-expect-error
      el.style.animationDuration = `${getDurationSeconds()}s`
    }

    return () => {
      return props.group
        ? (
        <TransitionGroup
          enter-active-class={`animate__animated animate__${getActiveClass(
            'In',
          )}`}
          leave-active-class={`animate__animated animate__${getActiveClass(
            'Out',
          )}`}
          appear={props.appear}
          onBeforeEnter={onBeforeEnter}
        >
          {() => renderSlot(slots, 'default')}
        </TransitionGroup>
          )
        : (
        <Transition
          enter-active-class={`animate__animated animate__${getActiveClass(
            'In',
          )}`}
          leave-active-class={`animate__animated animate__${getActiveClass(
            'Out',
          )}`}
          mode={props.mode}
          appear={props.appear}
          onBeforeEnter={onBeforeEnter}
        >
          {() => renderSlot(slots, 'default')}
        </Transition>
          )
    }
  },
})
