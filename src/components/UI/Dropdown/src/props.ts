import type { PropType } from 'vue'
import { ElDropdown } from 'element-plus'
import { easyOmit } from 'easy-fns-ts'

import { MultiTypeCompSharedProps } from '../../shared'

const extendProps = {
  ...MultiTypeCompSharedProps,

  modelValue: [String, Number] as PropType<StringOrNumber>,
}

export const extendPropKeys = Object.keys(extendProps)

export default {
  ...ElDropdown.props,

  ...easyOmit(extendProps, 'multiple'),
}
