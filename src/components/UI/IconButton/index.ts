import type { PopconfirmProps, TooltipProps } from 'naive-ui'
import type { ICompUIButtonProps } from '../Button'
import type { ICompUIIconProps } from '../Icon'

export { default } from './index.vue'

export interface ICompUIIconButtonProps {
  iconProps?: ICompUIIconProps
  buttonProps?: ICompUIButtonProps
  tooltip?: boolean
  tooltipMsg?: string | string[]
  tooltipProps?: TooltipProps
  confirm?: boolean
  confirmMsg?: string
  popConfirmProps?: PopconfirmProps
}
