import type { PropType } from 'vue'
import { ElPagination } from 'element-plus'

const extendProp = {
  autoScroll: {
    type: Boolean as PropType<boolean>,
    default: true,
  },
}

export const extendPropKeys = Object.keys(extendProp)

export default {
  ...ElPagination.props,

  ...extendProp,

  background: {
    type: Boolean as PropType<boolean>,
    default: true,
  },

  layout: {
    type: String as PropType<string>,
    default: 'total, sizes, prev, pager, next, jumper, slot',
  },
}
