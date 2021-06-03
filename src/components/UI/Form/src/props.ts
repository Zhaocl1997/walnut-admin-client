import type { PropType } from 'vue'
import type { WForm } from './types'
import { ElForm } from 'element-plus'

const extendProps = {
  schemas: Array as PropType<WForm.Schema.Item[]>,

  modelValue: Object as PropType<Recordable>,

  gutter: {
    type: Number as PropType<number>,
    default: 0,
  },

  span: {
    type: Number as PropType<number>,
    default: 24,
  },

  compact: {
    type: Boolean as PropType<boolean>,
    default: false,
  },

  query: {
    type: Boolean as PropType<boolean>,
    default: false,
  },

  foldable: {
    type: Boolean as PropType<boolean>,
    default: false,
  },

  countToFold: {
    type: Number as PropType<number>,
    default: 2,
  },

  // defaultFold: {
  //   type: Boolean as PropType<boolean>,
  //   default: false,
  // },

  // mock: {
  //   type: Boolean as PropType<boolean>,
  //   default: false,
  // },
}

export const extendPropKeys = Object.keys(extendProps)

export default {
  ...ElForm.props,

  labelWidth: {
    type: String as PropType<string>,
    default: 'auto',
  },

  ...extendProps,
}
