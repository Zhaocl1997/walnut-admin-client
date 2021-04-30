import type { PropType } from 'vue'
import { ElCheckboxGroup } from 'element-plus'
import { MultiTypeCompSharedProps } from '../../shared'

const extendProps = {
  ...MultiTypeCompSharedProps,

  text: String as PropType<string>,
}

export const extendPropKeys = Object.keys(extendProps)

export default {
  ...ElCheckboxGroup.props,

  ...extendProps,

  /**
   * @override
   */
  modelValue: [Object, Array, Boolean, String] as PropType<any>,
}
