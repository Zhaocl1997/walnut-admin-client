import type { PropType } from 'vue'
import type { WTreePropsOptions } from '../../Tree'

export default {
  // origin
  data: Array as PropType<any[]>,

  size: String as PropType<ComponentSize>,

  multiple: Boolean as PropType<boolean>,

  disabled: Boolean as PropType<boolean>,

  clearable: Boolean as PropType<boolean>,

  collapseTags: Boolean as PropType<boolean>,

  accordion: Boolean as PropType<boolean>,

  placeholder: String as PropType<string>,

  // custom
  modelValue: [String, Number, Array] as PropType<any[]>,

  props: Object as PropType<WTreePropsOptions>,
}
