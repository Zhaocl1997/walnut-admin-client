import type { PropType } from 'vue'
import { ElButton } from 'element-plus'

const extendProps = {
  suffixIcon: String as PropType<string>,
  retryDelay: [String, Number] as PropType<string | number>,
  loadDelay: [String, Number] as PropType<string | number>,
  block: Boolean as PropType<boolean>,
  text: String as PropType<string>,
  debounce: [String, Number] as PropType<string | number>,
}

export const extendPropKeys = Object.keys(extendProps)

export default {
  ...ElButton.props,

  ...extendProps,
}
