import type { IconProps } from '@iconify/vue'
import { Icon } from '@iconify/vue'

export const props = {
  ...(Icon.props as IconProps),
} as const
