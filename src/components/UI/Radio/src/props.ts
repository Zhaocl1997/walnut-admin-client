import type { PropType } from 'vue'
import { ElRadioGroup } from 'element-plus'
import { MultiTypeCompSharedProps } from '../../shared'

const extendProps = {
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

export const extendPropKeys = Object.keys(extendProps)

export default {
  ...ElRadioGroup.props,

  ...extendProps,
}
