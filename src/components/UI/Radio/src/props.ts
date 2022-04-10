import type { RadioProps } from 'naive-ui'

export const props = {
  options: {
    type: Array as PropType<(RadioProps & { label?: string })[]>,
    default: () => [],
  },
} as const
