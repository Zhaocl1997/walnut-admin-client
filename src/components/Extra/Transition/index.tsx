import { upperFirst } from 'easy-fns-ts'
import { Transition, TransitionGroup, renderSlot, TransitionProps } from 'vue'

export type TransitionMode = 'in-out' | 'out-in'

const props = {
  name: {
    type: String as PropType<Nullable<ValueOfTransitionNameConst>>,
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
    default: () => ({ enter: 500, leave: 500 }),
  },
}

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

    return () => {
      const Tag = !props.group ? Transition : TransitionGroup

      return (
        <Tag
          enter-active-class={`animate__animated animate__${getActiveClass(
            'In'
          )}`}
          leave-active-class={`animate__animated animate__${getActiveClass(
            'Out'
          )}`}
          mode={props.mode}
          appear={props.appear}
          duration={props.duration}
        >
          {() => renderSlot(slots, 'default')}
        </Tag>
      )
    }
  },
})
