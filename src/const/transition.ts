export const TransitionNameConst = {
  FADE: 'fade',
  SCALE: 'scale',
  ZOOM_OUT: 'zoom-out',
  ZOOM_FADE: 'zoom-fade',
  SLIDE_UP: 'slide-up',
  SLIDE_RIGHT: 'slide-right',
  SLIDE_DOWN: 'slide-down',
  SLIDE_LEFT: 'slide-left',
  SCROLL_UP: 'scroll-up',
  SCROLL_RIGHT: 'scroll-right',
  SCROLL_DOWN: 'scroll-down',
  SCROLL_LEFT: 'scroll-left',
} as const

export type ValueOfTransitionNameConst = ValueOf<typeof TransitionNameConst>
