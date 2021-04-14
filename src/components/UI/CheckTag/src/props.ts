import type { PropType } from 'vue'
import { ElCheckTag } from 'element-plus'
import { MultiTypeCompSharedProps } from './../../shared'

export default {
  ...ElCheckTag.props,

  ...MultiTypeCompSharedProps,

  modelValue: [String, Number, Array] as PropType<string | number[]>,
}
