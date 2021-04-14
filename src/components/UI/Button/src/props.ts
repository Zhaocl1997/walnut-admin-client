import type { PropType } from 'vue'
import { ElButton } from 'element-plus'

export default {
  ...ElButton.props,

  prefixIcon: String as PropType<string>,
  suffixIcon: String as PropType<string>,
  retryDelay: [String, Number] as PropType<string | number>,
  loadDelay: [String, Number] as PropType<string | number>,
  block: Boolean as PropType<boolean>,
  text: String as PropType<string>,
  throttle: [String, Number] as PropType<string | number>,
}
