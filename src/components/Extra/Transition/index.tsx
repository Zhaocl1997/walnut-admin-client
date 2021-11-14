import { Transition, TransitionGroup, renderSlot } from 'vue'

export type TransitionMode = 'in-out' | 'out-in' | 'default'

const props = {
  name: {
    type: String as PropType<Nullable<ValueOfTransitionNameConst>>,
    default: 'fade',
  },
  mode: {
    type: String as PropType<TransitionMode>,
    default: 'default',
  },
  group: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
}

export type WTransitionProps = ExtractPropTypes<typeof props>

export default defineComponent({
  name: 'WTransition',

  props,

  setup(props, { attrs, slots }) {
    return () => {
      const Tag = !props.group ? Transition : TransitionGroup
      return (
        <Tag name={props.name + '-transition'} mode={props.mode} {...attrs}>
          {() => renderSlot(slots, 'default')}
        </Tag>
      )
    }
  },
})
