import type { PropType } from 'vue'
import { ElPagination } from 'element-plus'

export default {
  ...ElPagination.props,

  autoScroll: {
    type: Boolean as PropType<boolean>,
    default: true,
  },

  background: {
    type: Boolean as PropType<boolean>,
    default: true,
  },

  layout: {
    type: String as PropType<string>,
    default: 'total, sizes, prev, pager, next, jumper, slot',
  },
}
