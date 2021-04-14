import type { PropType } from 'vue'
import { ElSelect } from 'element-plus'
import { MultiTypeCompSharedProps } from '../../shared'

export default {
  ...ElSelect.props,

  ...MultiTypeCompSharedProps,

  valueKey: {
    type: String as PropType<string>,
    default: '',
  },
}
