import type { PropType } from 'vue'

export const props = {
  /* icon through prop */
  icon: {
    type: String as PropType<string>,
    default: '',
  },

  /* text(default slot) through prop */
  textProp: {
    type: String as PropType<string>,
    default: '',
  },

  /* retry delay for seconds */
  retry: {
    type: Number as PropType<number>,
    default: 0,
  },

  /* debounce delay for miliseconds */
  debounce: {
    type: Number as PropType<number>,
    default: 0,
  },
}
