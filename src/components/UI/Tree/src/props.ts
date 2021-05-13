import type { PropType } from 'vue'
import type { TreeKey } from './types'

import { ElTree } from 'element-plus'

const extendProps = {
  modelValue: {
    type: [String, Number, Array] as PropType<TreeKey[]>,
    default: '',
  },

  multiple: {
    type: Boolean as PropType<boolean>,
    default: false,
  },

  leafOnly: {
    type: Boolean as PropType<boolean>,
    default: false,
  },

  includeHalfChecked: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
}

export const extendPropKeys = Object.keys(extendProps)

export default {
  ...ElTree.props,

  /**
   * @override
   */
  highlightCurrent: {
    type: Boolean as PropType<boolean>,
    default: true,
  },

  /**
   * @override
   */
  expandOnClickNode: {
    type: Boolean as PropType<boolean>,
    default: false,
  },

  ...extendProps,
}
