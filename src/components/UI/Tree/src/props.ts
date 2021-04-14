import type { PropType } from 'vue'

import { ElTree } from 'element-plus'

export default {
  ...ElTree.props,

  highlightCurrent: {
    type: Boolean as PropType<boolean>,
    default: true,
  },

  expandOnClickNode: {
    type: Boolean as PropType<boolean>,
    default: false,
  },

  modelValue: {
    type: [String, Number, Array] as PropType<string[] | number[]>,
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
