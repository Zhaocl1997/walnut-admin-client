import type { PropType } from 'vue'
import { Transition, TransitionGroup, renderSlot } from 'vue'

export type TransitionMode = 'in-out' | 'out-in' | 'default'
export type TransitionName =
  | 'fade'
  | 'scale'
  | 'zoom-out'
  | 'zoom-fade'
  | 'slide-up'
  | 'slide-right'
  | 'slide-down'
  | 'slide-left'
  | 'scroll-up'
  | 'scroll-right'
  | 'scroll-down'
  | 'scroll-left'

export interface WTransitionProps {
  name?: TransitionName
  mode?: TransitionMode
  group?: boolean
}

export default defineComponent({
  name: 'WTransition',

  props: {
    name: {
      type: String as PropType<TransitionName>,
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
