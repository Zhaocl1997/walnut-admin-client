import type { PropType } from 'vue'
import type { WButtonProps } from '../../Button/src/types'

export const props = {
  groups: {
    type: Array as PropType<WButtonProps[]>,
    default: () => [],
  },
}
