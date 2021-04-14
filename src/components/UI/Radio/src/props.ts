import type { PropType } from 'vue'
import { ElRadioGroup } from 'element-plus'
import { MultiTypeCompSharedProps } from '../../shared'

export default {
  ...ElRadioGroup.props,

  ...MultiTypeCompSharedProps,

  valueKey: {
    type: String as PropType<string>,
    default: '',
  },

  button: {
    type: Boolean as PropType<boolean>,
    default: false,
  },

  border: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
}
