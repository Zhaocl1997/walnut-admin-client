import type { PropType } from 'vue'
import { ElSelect } from 'element-plus'
import { MultiTypeCompSharedProps } from '../../shared'
import { easyOmit } from 'easy-fns-ts'

const extendProps = {
  ...MultiTypeCompSharedProps,

  block: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
}

export const extendPropKeys = Object.keys(easyOmit(extendProps, 'multiple'))

export default {
  ...ElSelect.props,

  ...extendProps,

  /**
   * @override
   */
  valueKey: {
    type: String as PropType<string>,
    default: '',
  },
}
