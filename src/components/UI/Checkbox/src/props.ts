import type { PropType } from 'vue'
import type { CheckboxProps } from 'naive-ui'

export const props = {
  options: {
    type: Array as PropType<CheckboxProps[]>,
    default: () => [],
  },
}
