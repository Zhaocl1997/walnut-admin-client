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

/**
 * @link https://element-plus.gitee.io/#/zh-CN/component/scrollbar#scrollbar-attributes
 */
export interface ElScrollbarProps {
  height: string
  maxHeight: string
  native: boolean
  noresize: boolean
  tag: string
  viewClass: string
  viewStyle: string
  wrapClass: string
  wrapStyle: string
}

/**
 * @description extend from `ElScrollbarProps`
 */
export interface WScrollProps extends Partial<ElScrollbarProps> {
  vertical?: boolean
  modelValue?: number
}

/**
 * @description el-scrollbar ref type
 */
export interface ElScrollbarRef {
  handleScroll: Fn
  height: string
  maxHeight: string
  moveX: number
  moveY: number
  native: boolean
  noresize: boolean
  resize: HTMLElement
  scrollbar: HTMLElement
  sizeHeight: string
  sizeWidth: string
  style: string
  tag: string
  update: Fn
  viewClass: string
  viewStyle: string
  wrap: HTMLElement
  wrapClass: string
  wrapStyle: string
}
