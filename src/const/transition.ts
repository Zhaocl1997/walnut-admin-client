export const TransitionNameConst = {
  FADE: 'fade',
  FADE_DOWN: 'fade-down',
  FADE_DOWN_BIG: 'fade-downBig',
  FADE_LEFT: 'fade-left',
  FADE_LEFT_BIG: 'fade-leftBig',
  FADE_RIGHT: 'fade-right',
  FADE_RIGHT_BIG: 'fade-rightBig',
  FADE_UP: 'fade-up',
  FADE_UP_BIG: 'fade-upBig',
  FADE_TOP_LEFT: 'fade-topLeft',
  FADE_TOP_RIGHT: 'fade-topRight',
  FADE_BOTTOM_LEFT: 'fade-bottomLeft',
  FADE_BOTTOM_RIGHT: 'fade-bottomRight',

  ZOOM: 'zoom',
  ZOOM_DOWN: 'zoom-down',
  ZOOM_LEFT: 'zoom-left',
  ZOOM_RIGHT: 'zoom-right',
  ZOOM_UP: 'zoom-up',

  BOUNCE: 'bounce',
  BOUNCE_DOWN: 'bounce-down',
  BOUNCE_LEFT: 'bounce-left',
  BOUNCE_RIGHT: 'bounce-right',
  BOUNCE_UP: 'bounce-up',

  ROTATE: 'rotate',
  ROTATE_DOWN_LEFT: 'rotate-downLeft',
  ROTATE_DOWN_RIGHT: 'rotate-downRight',
  ROTATE_UP_LEFT: 'rotate-upLeft',
  ROTATE_UP_RIGHT: 'rotate-upRight',

  SLIDE_DOWN: 'slide-down',
  SLIDE_LEFT: 'slide-left',
  SLIDE_RIGHT: 'slide-right',
  SLIDE_UP: 'slide-up',

  BACK_DOWN: 'back-down',
  BACK_LEFT: 'back-left',
  BACK_RIGHT: 'back-right',
  BACK_UP: 'back-up',

  FLIP_X: 'flip-x',
  FLIP_Y: 'flip-y',
} as const

export type ValueOfTransitionNameConst =
  typeof TransitionNameConst[keyof typeof TransitionNameConst]
