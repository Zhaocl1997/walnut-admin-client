import { inputProps } from 'naive-ui'

export const extendedProps = {
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

  copiable: {
    type: Boolean as PropType<boolean>,
    default: false,
  },

  // Just add your own modifiers here!
  valueModifiers: {
    type: Object as PropType<{
      trim?: boolean
      capitalize?: boolean
      uppercase?: boolean
    }>,

    default: () => ({
      trim: false,
      capitalize: false,
      uppercase: false,
    }),
  },
} as const

export const props = {
  ...inputProps,
  ...extendedProps,
} as const
