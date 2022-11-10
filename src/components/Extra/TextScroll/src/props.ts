export const props = {
  texts: {
    type: Array as PropType<string[]>,
    default: () => [],
  },

  maxLength: {
    type: Number as PropType<number>,
    default: 8,
  },

  speed: {
    type: Number as PropType<number>,
    default: 3000,
  },

  mode: {
    type: String as PropType<'vertical' | 'horizontal'>,
    default: 'horizontal',
  },
} as const
