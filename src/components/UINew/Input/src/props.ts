import type { PropType } from 'vue'

export const props = {
  trim: {
    type: Boolean as PropType<boolean>,
    default: false,
  },

  blackList: {
    type: Array as PropType<string[]>,
    default: () => [],
  },

  suffix: {
    type: String as PropType<string>,
    default: '',
  },

  prefix: {
    type: String as PropType<string>,
    default: '',
  },

  suffixIcon: {
    type: String as PropType<string>,
    default: '',
  },

  prefixIcon: {
    type: String as PropType<string>,
    default: '',
  },

  helpMessage: {
    type: String as PropType<string>,
    default: '',
  },

  debounce: {
    type: Number as PropType<number>,
    default: 0,
  },
}
