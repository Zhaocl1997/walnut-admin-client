import type { PropType } from 'vue'
import { defineComponent, Transition, TransitionGroup, renderSlot } from 'vue'

type TransitionMode = 'in-out' | 'out-in' | 'default' | undefined

export default defineComponent({
  name: 'WTransition',

  props: {
    name: {
      type: String as PropType<any>,
      default: 'fade',
    },
    group: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
    mode: {
      type: String as PropType<TransitionMode>,
      default: 'default',
    },
  },

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

export enum TransitionEnum {
  FADE = 'fade',
  SCALE = 'scale',
  ZOOM_OUT = 'zoom-out',
  ZOOM_FADE = 'zoom-fade',
  SLIDE_UP = 'slide-up',
  SLIDE_RIGHT = 'slide-right',
  SLIDE_DOWN = 'slide-down',
  SLIDE_LEFT = 'slide-left',
  SCROLL_UP = 'scroll-up',
  SCROLL_RIGHT = 'scroll-right',
  SCROLL_DOWN = 'scroll-down',
  SCROLL_LEFT = 'scroll-left',
}
