export const props = {
  /* icon through prop */
  icon: {
    type: String as PropType<string>,
    default: '',
  },

  /* text(default slot) through prop */
  textProp: {
    type: [String, Function] as PropType<string | Fn>,
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

  /* confirm type button */
  confirm: {
    type: Boolean as PropType<boolean>,
    default: false,
  },

  /* permission string */
  auth: {
    type: String as PropType<string>,
    default: '',
  },

  /* instead of normal button, provide `icon` and `text-prop`, then pass `iconButton` true */
  iconButton: {
    type: Boolean as PropType<boolean>,
    default: false,
  },

  /* manually controll retry */
  manualRetry: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
} as const
