import type { PropType } from 'vue'

import { ElScrollbar } from 'element-plus'

const extendProps = {
  vertical: {
    type: Boolean as PropType<boolean>,
    default: false,
  },

  modelValue: {
    type: Number as PropType<number>,
    default: 0,
  },
}

export const extendPropKeys = Object.keys(extendProps)

export default {
  ...ElScrollbar.props,

  ...extendProps,
}
