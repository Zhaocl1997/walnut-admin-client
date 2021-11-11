import type { ModalProps, DrawerProps, DrawerContentProps } from 'naive-ui'
import type { WForm } from './types'

import type {
  LabelAlign,
  LabelPlacement,
  FormRules,
} from 'naive-ui/lib/form/src/interface'

export const extendProps = {
  schemas: {
    type: Array as PropType<WForm.Schema.Item[]>,
    default: () => [],
  },

  cols: {
    type: Number as PropType<number>,
    default: 24,
  },

  span: {
    type: Number as PropType<number>,
    default: 24,
  },

  xGap: {
    type: Number as PropType<number>,
    default: 20,
  },

  yGap: {
    type: Number as PropType<number>,
    default: 0,
  },

  preset: {
    type: String as PropType<WForm.preset>,
    default: undefined,
  },

  baseRules: {
    type: Boolean as PropType<boolean>,
    default: false,
  },

  advancedProps: {
    type: Object as PropType<
      (ModalProps | (DrawerProps & DrawerContentProps)) &
        Pick<WForm.Inst.WFormInst, 'onYes' | 'onNo'>
    >,
    default: undefined,
  },

  formItemClass: String as PropType<string>,
  formItemComponentClass: String as PropType<string>,
}

export const props = {
  inline: Boolean,
  labelWidth: [Number, String] as PropType<StringOrNumber>,
  labelAlign: {
    type: String as PropType<LabelAlign>,
    default: 'right',
  },
  labelPlacement: {
    type: String as PropType<LabelPlacement>,
    default: 'left',
  },
  model: {
    type: Object as PropType<Record<string, any>>,
    default: () => {},
  },
  rules: Object as PropType<FormRules>,
  disabled: Boolean,
  size: String as PropType<'small' | 'medium' | 'large'>,
  showRequireMark: {
    type: Boolean as PropType<boolean | undefined>,
    default: undefined,
  },
  requireMarkPlacement: String as PropType<'left' | 'right'>,
  showFeedback: {
    type: Boolean,
    default: true,
  },
  onSubmit: {
    type: Function as PropType<(e: Event) => void>,
    default: (e: Event) => e.preventDefault(),
  },
  showLabel: {
    type: Boolean as PropType<boolean | undefined>,
    default: undefined,
  },

  ...extendProps,
} as const

export type WFormPropType = ExtractPropTypes<typeof props>
