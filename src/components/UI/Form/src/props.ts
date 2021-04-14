import type { PropType } from 'vue'
import type { WFormSchemaItem } from './types'
import { ElForm } from 'element-plus'

export default {
  ...ElForm.props,

  labelWidth: {
    type: String as PropType<string>,
    default: 'auto',
  },

  schemas: {
    type: Array as PropType<WFormSchemaItem[]>,
    default: () => {
      return []
    },
  },

  modelValue: {
    type: Object as PropType<Recordable>,
    default: () => {
      return {}
    },
    required: true,
  },

  gutter: {
    type: Number as PropType<number>,
    default: 0,
  },

  span: {
    type: Number as PropType<number>,
    default: 24,
  },

  defaultFold: {
    type: Boolean as PropType<boolean>,
    default: false,
  },

  countToFold: {
    type: Number as PropType<number>,
    default: 3,
  },

  mock: {
    type: Boolean as PropType<boolean>,
    default: false,
  },

  query: {
    type: Boolean as PropType<boolean>,
    default: false,
  },

  compact: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
}
