import type { PropType } from 'vue'
import { ElCheckboxGroup } from 'element-plus'
import { MultiTypeCompSharedProps } from '../../shared'

export default {
  ...ElCheckboxGroup.props,

  ...MultiTypeCompSharedProps,

  text: String as PropType<string>,

  /**
   * @override
   */
  modelValue: [Object, Array, Boolean, String] as PropType<any>,
}
