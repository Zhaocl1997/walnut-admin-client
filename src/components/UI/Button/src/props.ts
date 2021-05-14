import type { PropType } from 'vue'
import { ElButton } from 'element-plus'

const extendProps = {
  suffixIcon: {
    type: String as PropType<string>,
    default: '',
  },

  retryDelay: {
    type: Number as PropType<number>,
    default: 0,
  },

  loadDelay: {
    type: Number as PropType<number>,
    default: 0,
  },

  block: {
    type: Boolean as PropType<boolean>,
    default: false,
  },

  text: {
    type: String as PropType<string>,
    default: '',
  },

  debounce: {
    type: Number as PropType<number>,
    default: 0,
  },

  helpMessage: {
    type: String as PropType<string>,
    default: '',
  },
}

export const extendPropKeys = Object.keys(extendProps)

export default {
  ...ElButton.props,

  ...extendProps,
}
