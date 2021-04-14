export type ScrollBarMode = 'horizontal' | 'vertical'

export enum ScrollModeEnum {
  HORIZONTAL = 'horizontal',
  VERTICAL = 'vertical',
}

export enum ScrollPropEnum {
  SCROLLTOP = 'scrollTop',
  SCROLLLEFT = 'scrollLeft',
}

export enum ScrollFieldEnum {
  OFFSETLEFT = 'offsetLeft',
  OFFSETTOP = 'offsetTop',
}

export interface ScrollToParams {
  el: HTMLElement
  to: number
  duration?: number
  mode?: ScrollBarMode
  callback?: () => any
}

export interface ScrollToAdvancedParams {
  index?: number
}

export interface WScrollbarRef {
  scrollTo: (to: number, duration?: number) => void
  scrollToStart: (duration?: number) => void
  scrollToEnd: (duration?: number) => void
  scrollToAdvanced: (args: ScrollToAdvancedParams, duration?: number) => void
}

export interface WScrollProps {
  vertical?: boolean
}
