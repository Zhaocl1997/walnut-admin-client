export const props = {
  headerFixed: {
    type: Boolean as PropType<boolean>,
    default: false,
  },

  footerFixed: {
    type: Boolean as PropType<boolean>,
    default: false,
  },

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
