import type { PropType } from 'vue'

export const MultiTypeCompSharedProps = {
  options: {
    type: Array as PropType<any[]>,
    default: () => [],
  },

  optionValue: {
    type: String as PropType<string>,
    default: 'value',
  },

  optionLabel: {
    type: String as PropType<string>,
    default: 'label',
  },

  valueFormat: {
    type: String as PropType<string>,
    default: '',
  },

  valueType: {
    type: String as PropType<string>,
    default: 'string',
  },

  multiple: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
}
