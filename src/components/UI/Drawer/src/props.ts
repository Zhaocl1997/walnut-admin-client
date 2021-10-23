export const props = {
  closable: {
    type: Boolean as PropType<boolean>,
    default: false,
  },

  title: {
    type: String as PropType<string>,
    default: 'Title',
  },

  loading: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
}
