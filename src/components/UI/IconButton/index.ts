import type { IconProps } from '@iconify/vue'
import type { PopconfirmProps, TooltipProps } from 'naive-ui'
import type { ICompUIButtonProps } from '../Button'

export { default } from './index.vue'

export interface ICompUIIconButtonProps {
  iconProps?: IconProps
  buttonProps?: ICompUIButtonProps
  tooltip?: boolean
  tooltipMsg?: string | string[]
  tooltipProps?: TooltipProps
  confirm?: boolean
  confirmMsg?: string
  popConfirmProps?: PopconfirmProps
}
