import type { DrawerContentProps, DrawerProps, ModalProps } from 'naive-ui'
import type {
  FormRules,
  LabelAlign,
  LabelPlacement,
} from 'naive-ui/lib/form/src/interface'
import type { WDescriptionProps } from '../../Descriptions'
import type { WTable } from '../../Table'

import type { WForm } from './types'

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
      Partial<Pick<WForm.Inst.WFormInst, 'onYes' | 'onNo'>> & {
        actionType?: WTable.HeaderActionType
        defaultButton?: boolean
        detailTitle?: boolean
        resizable?: boolean
        defaultWidth?: string
        defaultHeight?: string
        width?: string
      }
    >,
    default: undefined,
  },

  /**
   * @description form item class, including the label and content
   */
  formItemClass: String as PropType<string>,

  /**
   * @description class only for form item component
   */
  formItemComponentClass: String as PropType<string>,

  /**
   * @description locale middle unique key implement with back end messages
   * @example `form.${uniqueKey}.${path}` used for label locale
   * @example `form.${uniqueKey}.${path}.helpMsg` built in for label help message
   * So in this rule, all we need to do is provide a `localeUniqueKey` and config the messages in `Locale Manage`
   * No need to privide a label property in `schema item formProp`, the built in logic will handle the label properly.
   */
  localeUniqueKey: String as PropType<string>,

  /**
   * @description Used for form related to a localed table
   */
  localeWithTable: Boolean as PropType<boolean>,

  /**
   * @description display in descrition mode
   */
  useDescription: Boolean as PropType<boolean>,

  /**
   * @description description props
   */
  descriptionProps: Object as PropType<WDescriptionProps>,
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
    default: () => { },
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
