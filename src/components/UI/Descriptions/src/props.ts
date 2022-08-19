import type { WDescriptionsItem } from './types'

export const props = {
  items: Array as PropType<WDescriptionsItem[]>,

  colon: Boolean as PropType<boolean>,
} as const
