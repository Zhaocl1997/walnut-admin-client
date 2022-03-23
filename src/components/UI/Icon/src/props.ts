import type {
  IconifyHorizontalIconAlignment,
  IconifyVerticalIconAlignment,
} from '@iconify/vue'

export const props = {
  icon: String as PropType<string>,
  height: String as PropType<string>,
  width: String as PropType<string>,
  color: String as PropType<string>,
  flip: String as PropType<string>,
  align: String as PropType<string>,
  rotate: [String, Number] as PropType<string | number>,
  inline: Boolean as PropType<boolean>,
  slice: Boolean as PropType<boolean>,
  hFlip: Boolean as PropType<boolean>,
  vFlip: Boolean as PropType<boolean>,
  hAlign: String as PropType<IconifyHorizontalIconAlignment>,
  vAlign: String as PropType<IconifyVerticalIconAlignment>,
} as const
