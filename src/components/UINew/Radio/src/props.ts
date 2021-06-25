import type { PropType } from 'vue'
import type { RadioProps } from 'naive-ui'

export const props = {
  options: {
    type: Array as PropType<RadioProps[]>,
    default: () => [],
  },
}
