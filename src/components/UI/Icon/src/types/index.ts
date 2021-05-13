import type { IconifyIconProps } from '@iconify/vue'

export interface WIconProps extends Omit<IconifyIconProps, 'icon' | 'rotate'> {
  icon?: string
  rotate?: StringOrNumber
}
