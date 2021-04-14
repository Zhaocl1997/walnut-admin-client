/**
 * @description see more https://element-plus.gitee.io/#/zh-CN/component/dialog#attributes
 */
export interface ElDialogProps {
  modelValue: boolean
  title: string
  width: string | number
  fullscreen: boolean
  top: string
  modal: boolean
  appendToBody: boolean
  lockScroll: boolean
  customClass: string
  openDelay: number
  closeDelay: number
  closeOnClickModal: boolean
  closeOnPressEscape: boolean
  showClose: boolean
  beforeClose: (done: Fn) => void
  center: boolean
  destoryOnClose: boolean
}

/**
 * @description extend from `ElDialog` props
 */
export type WDialogProps = Partial<ElDialogProps>
