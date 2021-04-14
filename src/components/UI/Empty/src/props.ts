import type { PropType } from 'vue'

export default {
  total: {
    type: Number as PropType<number>,
    default: 0,
  },

  image: {
    type: String as PropType<string>,
    default: '',
  },

  imageSize: {
    type: Number as PropType<number>,
    default: 0,
  },

  description: {
    type: String as PropType<string>,
    default: '',
  },
}
