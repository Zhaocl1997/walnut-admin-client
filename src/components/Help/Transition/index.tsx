import type { PropType } from 'vue'
import { defineComponent, Transition, TransitionGroup, renderSlot } from 'vue'

type TransitionMode = 'in-out' | 'out-in' | 'default' | undefined

const createTransition = (name: string, mode?: TransitionMode) => {
  return defineComponent({
    name,

    props: {
      group: {
        type: Boolean as PropType<boolean>,
        default: false,
      },
      mode: {
        type: String as PropType<TransitionMode>,
        default: mode,
      },
    },

    setup(props, { attrs, slots }) {
      return () => {
        const Tag = !props.group ? Transition : TransitionGroup
        return (
          <Tag name={name} mode={props.mode} {...attrs}>
            {() => renderSlot(slots, 'default')}
          </Tag>
        )
      }
    },
  })
}

export const FadeTransition = createTransition('fade-transition')
export const ScaleTransition = createTransition('scale-transition')
