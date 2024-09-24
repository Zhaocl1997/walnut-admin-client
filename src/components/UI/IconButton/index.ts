import type { IconProps } from '@iconify/vue'
import type { ICompUIButtonProps } from '../Button'

export { default } from './index.vue'

export interface ICompUIIconButtonProps {
  iconProps?: IconProps
  buttonProps?: ICompUIButtonProps
  tooltip?: boolean
  tooltipMsg?: string | string[]
  confirm?: boolean
  confirmMsg?: string
}
