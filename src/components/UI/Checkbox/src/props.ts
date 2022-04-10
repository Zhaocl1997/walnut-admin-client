import type { CheckboxProps } from 'naive-ui'

export const props = {
  options: {
    type: Array as PropType<CheckboxProps[]>,
    default: () => [],
  },
} as const
