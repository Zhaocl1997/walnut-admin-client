import type { PropType } from 'vue'
import { ElDropdown } from 'element-plus'
import { easyOmit } from 'easy-fns-ts'

import { MultiTypeCompSharedProps } from './../../shared'

export default {
  ...ElDropdown.props,

  ...easyOmit(MultiTypeCompSharedProps, 'multiple'),

  modelValue: [String, Number] as PropType<string | number>,
}
