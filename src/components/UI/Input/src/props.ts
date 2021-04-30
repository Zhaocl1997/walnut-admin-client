import type { PropType } from 'vue'
import type { WInputModifiers, WInputSlotPosition } from './types'
import { ElInput } from 'element-plus'

const extendProps = {
  modelModifiers: {
    type: Object as PropType<WInputModifiers>,
    default: () => ({ trim: true }),
  },

  blackList: {
    type: Array as PropType<string[]>,
    default: () => [],
  },

  helpMessage: {
    type: String as PropType<string>,
    default: '',
  },

  helpPosition: {
    type: String as PropType<WInputSlotPosition>,
    default: 'append',
  },

  prepend: {
    type: String as PropType<string>,
    default: '',
  },

  append: {
    type: String as PropType<string>,
    default: '',
  },

  debounce: {
    type: Number as PropType<number>,
    default: 0,
  },
}

export const extendPropKeys = Object.keys(extendProps)

export default {
  ...ElInput.props,

  ...extendProps,
}
