import type { PopoverPlacement } from 'naive-ui'

export const props = {
  type: String as PropType<NaiveCompType>,

  disabled: Boolean as PropType<boolean>,

  helpMessage: [String, Function] as PropType<string | Fn<string>>,

  placement: String as PropType<PopoverPlacement>,
}
