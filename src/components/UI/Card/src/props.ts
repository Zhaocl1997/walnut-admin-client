export const props = {
  collapse: Boolean as PropType<boolean>,

  headerPreset: String as PropType<'collapse' | 'refresh'>,

  loading: Boolean as PropType<boolean>,
} as const
