// business
import type { ICompBusinessAreaCascaderProps } from '@/components/Business/AreaCascader'
import type { ICompBusinessDictProps } from '@/components/Business/Dict'

// extra
import type { ICompExtraEmailInputProps } from '@/components/Extra/EmailInput'
import type { ICompExtraIconPickerProps } from '@/components/Extra/IconPicker'
import type { ICompExtraLocaleSelectProps } from '@/components/Extra/LocaleSelect'
import type { ICompExtraPasswordProps } from '@/components/Extra/Password'
import type { ICompExtraPhoneNumberInputProps } from '@/components/Extra/PhoneNumberInput'
import type { ICompExtraSMSInputProps } from '@/components/Extra/SMSInput'
import type { ICompExtraTransitionProps } from '@/components/Extra/Transition'
import type { IWCompVendorTinymceEditorProps } from '@/components/Vendor/Tinymce'
import type { useEventParams } from '@/hooks/component/useEvent'

import type { IHooksUseProps } from '@/hooks/core/useProps'
// raw
import type {
  DynamicInputProps,
  FormInst,
  FormItemProps,
  FormItemRule,
  FormRules,
  GridItemProps,
  SliderProps,
  TreeSelectProps,
} from 'naive-ui'

import type { LabelAlign, LabelPlacement, Size } from 'naive-ui/es/form/src/interface'
// ui types
import type { ICompUIButtonProps } from '../../Button'
import type { ICompUIButtonConfirmProps } from '../../ButtonConfirm'
import type { ICompUIButtonGroupProps } from '../../ButtonGroup'
import type { ICompUIButtonRetryProps } from '../../ButtonRetry'
import type { ICompUICheckboxProps } from '../../Checkbox'
import type { ICompUIColorPickerProps } from '../../ColorPicker'
import type { ICompUIDatePickerProps } from '../../DatePicker'
import type { ICompUIDescriptionProps, ICompUIDescriptionsItem } from '../../Descriptions'
import type { ICompUIDynamicTagsProps } from '../../DynamicTags'
import type { ICompUIInputProps } from '../../Input'
import type { ICompUIInputNumberProps } from '../../InputNumber'
import type { ICompUIRadioProps } from '../../Radio'
import type { ICompUISelectProps } from '../../Select'
import type { ICompUISwitchProps } from '../../Switch'
import type { ICompUITimePickerProps } from '../../TimePicker'

import type { ICompUITreeProps } from '../../Tree'
// extend
import type { ICompUIFormItemExtendDividerProps } from './components/Extend/Divider'
import type { ICompUIFormItemExtendQueryProps } from './components/Extend/Query'
import type { ICompUIFormHooksItemId } from './hooks/useFormItemId'
import type { ICompUIFormHooksMethods } from './hooks/useFormMethods'

export declare type RuleType = 'string' | 'number' | 'boolean' | 'method' | 'regexp' | 'integer' | 'float' | 'array' | 'object' | 'enum' | 'date' | 'url' | 'hex' | 'email' | 'pattern' | 'any'

export declare namespace WForm {

  type preset = 'modal' | 'drawer'

  type LocaleType = 'origin' | 'helpMsg' | 'rule' | 'placeholder'

  type MaybeBooleanField = 'vIf' | 'vShow'

  type ScopeOrGlobalField = 'visibleMode' | 'transitionName'

  type DictComponentType = 'select' | 'checkbox' | 'radio'

  type FormVisibleMode = 'no-move' | 'auto-forward'

  type DefaultValue = BaseDataType | BaseDataType[] | undefined | null

  type onFinishFormLoadingCallback = Fn<Params.FinishLoading, void | Promise<void>>

  namespace Inst {
    type NFormInst = FormInst

    interface WFormInst<T> extends Omit<NFormInst, 'validate'> {
      // rewrite
      validate: (fields?: (keyof T)[]) => Promise<boolean>

      setProps: IHooksUseProps<Props<T>>['setProps']

      // onOpen?: (beforeHook?: Fn) => Promise<void>
      // onClose?: Fn
      // onYes?: (
      //   apiHandler: (apiFn: Fn, params: RowData) => Promise<void>,
      //   done: () => void
      // ) => void
      // onNo?: Fn
    }
  }

  namespace Hook {
    type useFormReturnType<T> = [
      (instance: Inst.WFormInst<T>) => void,
      ICompUIFormHooksMethods<T>,
    ]
  }

  interface Props<T> {
    // original
    inline?: boolean
    labelWidth?: StringOrNumber
    labelAlign?: LabelAlign
    labelPlacement?: LabelPlacement
    model?: T
    rules?: FormRules
    disabled?: boolean
    size?: Size
    showRequireMark?: boolean
    requireMarkPlacement?: 'left' | 'right' | 'right-hanging'
    showFeedback?: boolean
    showLabel?: boolean

    // custom
    schemas?: WForm.Schema.Item<T>[]
    cols?: number
    span?: number
    xGap?: number
    yGap?: number
    perset?: WForm.preset
    baseRules?: boolean

    /**
     * @description v-if/v-show form item visible position mode
     */
    visibleMode?: FormVisibleMode

    /**
     * @description global transition name
     */
    transitionName?: ValueOfAppConstTransitionName

    /**
     * @description form item class, including the label and content
     */
    formItemClass?: string

    /**
     * @description class only for form item component
     */
    formItemComponentClass?: string

    /**
     * @description locale middle unique key implement with back end messages
     * @example `form.${uniqueKey}.${path}` used for label locale
     * @example `form.${uniqueKey}.${path}.helpMsg` built in for label help message
     * So in this rule, all we need to do is provide a `localeUniqueKey` and config the messages in `Locale Manage`
     * No need to privide a label property in `schema item formProp`, the built in logic will handle the label properly.
     */
    localeUniqueKey?: string

    /**
     * @description Used for form related to a localed table
     */
    localeWithTable?: boolean

    /**
     * @description display in descrition mode
     */
    useDescription?: boolean

    /**
     * @description description props
     */
    descriptionProps?: ICompUIDescriptionProps
  }

  interface Context<T> {
    formRef: Ref<Inst.NFormInst>
    formSchemas: Ref<Schema.Item<T>[]>
    formEvent: (val: Params.UseEvent<T>) => void
    formItemIdCtx: ICompUIFormHooksItemId
    formPropsCtx: IHooksUseProps<Props<T>>
  }

  interface Emits<T> {
    hook: [inst: Inst.WFormInst<T>]
    query: [params: Params.FinishLoading]
    reset: [params: Params.FinishLoading]
  }

  namespace Params {
    interface Callback<T = any> {
      formData: T
    }

    interface FinishLoading { done: Fn }

    type UseEvent<T> =
      | useEventParams<'query', FinishLoading>
      | useEventParams<'reset', FinishLoading>
      | useEventParams<'hook', Inst.WFormInst<T>>
  }

  namespace Events {
    type Callback<T = any, R = void> = (
      params: Params.Callback<T>
    ) => R | undefined
  }

  namespace Schema {
    interface DomProps {
      style?: Partial<CSSStyleDeclaration>
      class?: string
    }

    interface ComponentPropPool<D = any> {

      // base
      'Base:Render': {
        render: Events.Callback<D, VNode | VNode[] | string>
      }
      'Base:Slot': Record<string, never>

      // @/components/UI
      'Base:Button': ICompUIButtonProps
      'Base:ButtonConfirm': ICompUIButtonConfirmProps
      'Base:ButtonGroup': ICompUIButtonGroupProps
      'Base:ButtonRetry': ICompUIButtonRetryProps
      'Base:Checkbox': ICompUICheckboxProps
      'Base:ColorPicker': ICompUIColorPickerProps
      'Base:DatePicker': ICompUIDatePickerProps
      'Base:DynamicTags': ICompUIDynamicTagsProps
      'Base:Input': ICompUIInputProps
      'Base:InputNumber': ICompUIInputNumberProps
      'Base:Radio': ICompUIRadioProps
      'Base:Select': ICompUISelectProps
      'Base:Switch': ICompUISwitchProps
      'Base:TimePicker': ICompUITimePickerProps
      'Base:Tree': ICompUITreeProps

      // @/components/Extra
      'Extra:EmailInput': ICompExtraEmailInputProps
      'Extra:IconPicker': ICompExtraIconPickerProps
      'Extra:LocaleSelect': ICompExtraLocaleSelectProps
      'Extra:Password': ICompExtraPasswordProps
      'Extra:PhoneNumberInput': ICompExtraPhoneNumberInputProps
      'Extra:SMSInput': ICompExtraSMSInputProps
      'Extra:TransitionSelect': ICompExtraTransitionProps

      // raw
      'Raw:DynamicInput': DynamicInputProps
      'Raw:Slider': SliderProps
      'Raw:TreeSelect': TreeSelectProps

      // business
      'Business:AreaCascader': ICompBusinessAreaCascaderProps
      'Business:Dict': ICompBusinessDictProps

      // extend
      'Extend:Query': ICompUIFormItemExtendQueryProps
      'Extend:Divider': ICompUIFormItemExtendDividerProps

      'Extend:RoleSelect': {
        multiple?: boolean
        valueSeparator?: string
        valueType?: 'string' | 'number'
      }

      'Vendor:Tinymce': IWCompVendorTinymceEditorProps
    }

    interface DynamicSchemaItemProps<
      T extends keyof ComponentPropPool,
      D,
      EP = any,
    > {
      /**
       * @description internal flag to control show
       */
      _internalShow?: boolean

      type: T

      componentProp?: ComponentPropPool<D>[T] &
        DomProps & {
        /**
         * @description Even though most naive-ui component already has `defaultValue` prop, some custom components do not have one, so we maually add it to support ts better
         */
          defaultValue?: DefaultValue

          placeholder?: string
        }

      formProp?: Omit<FormItemProps, 'rule' | 'label'> & {
        /**
         * @override
         * @description add boolean type to rule
         * Set `rule` false when set `baseRules` true but this form item uses no rule
         */
        rule?: FormItemRule | FormItemRule[] | undefined | boolean

        /**
         * @override
         * @description add boolean type to label
         * Used for dict form item label, set true to use dict type name as form label
         */
        label?: string | boolean

        /**
         * @description when using `base-rules`, you can provide a `ruleType` to specific the value type, default would ba a `any`
         * Need to mention that array value must specific a `ruleType: 'array'` to make default rules work
         */
        ruleType?: RuleType

        /**
         * @description normally is string or string array.
         * But with locale implement, need to specify show help message, which means a boolean.
         */
        labelHelpMessage?: string | string[] | boolean

        /**
         * @description Used for localed form item which do not need to locale with the whole form
         * TRUE when localeUniqueKey has value, specify FALSE when no need to locale the label or labelHelpMessage.
         */
        locale?: boolean

        /**
         * @description Used for form related to a localed table
         */
        localeWithTable?: boolean

        /**
         * @description Used for render/slot typed item, whether apply the default base rules
         * @deprecated
         */
        baseRuleApplied?: boolean
      }

      gridProp?: GridItemProps & { class?: string }

      /**
       * @description Customize form item transition
       */
      transitionProp?: Omit<Partial<ICompExtraTransitionProps>, 'group'>

      /**
       * @description By default support v-if/v-show control
       * Also scoped `visibleMode` supported, override the same prop on form
       */
      extraProp?: {
        /**
         * @description v-if control visible
         */
        vIf?: boolean | Events.Callback<D, boolean>

        /**
         * @description v-show control visible
         */
        vShow?: boolean | Events.Callback<D, boolean>

        /**
         * @description v-if/v-show form item visible position mode
         */
        visibleMode?: FormVisibleMode
      } & Partial<EP>

      descriptionProp?: Partial<ICompUIDescriptionsItem<D>>
    }

    namespace SchemaItem {

      type RoleSelectSchema<D> = DynamicSchemaItemProps<'Extend:RoleSelect', D>

      type TinymceSchema<D> = DynamicSchemaItemProps<'Vendor:Tinymce', D>

      // base
      type RenderSchema<D> = DynamicSchemaItemProps<'Base:Render', D>
      type SlotSchema<D> = DynamicSchemaItemProps<'Base:Slot', D>

      // ui
      type ButtonSchema<D> = DynamicSchemaItemProps<'Base:Button', D>
      type ButtonConfirmSchema<D> = DynamicSchemaItemProps<'Base:ButtonConfirm', D>
      type ButtonGroupSchema<D> = DynamicSchemaItemProps<'Base:ButtonGroup', D>
      type ButtonRetry<D> = DynamicSchemaItemProps<'Base:ButtonRetry', D>
      type CheckboxSchema<D> = DynamicSchemaItemProps<'Base:Checkbox', D>
      type ColorPickerSchema<D> = DynamicSchemaItemProps<'Base:ColorPicker', D>
      type DatePickerSchema<D> = DynamicSchemaItemProps<'Base:DatePicker', D>
      type DynamicTagsSchema<D> = DynamicSchemaItemProps<'Base:DynamicTags', D>
      type InputSchema<D> = DynamicSchemaItemProps<'Base:Input', D>
      type InputNumberSchema<D> = DynamicSchemaItemProps<'Base:InputNumber', D>
      type RadioSchema<D> = DynamicSchemaItemProps<'Base:Radio', D>
      type SelectSchema<D> = DynamicSchemaItemProps<'Base:Select', D>
      type SwitchSchema<D> = DynamicSchemaItemProps<'Base:Switch', D>
      type TimePickerSchema<D> = DynamicSchemaItemProps<'Base:TimePicker', D>
      type TreeSchema<D> = DynamicSchemaItemProps<'Base:Tree', D>

      // extra
      type EmailInputSchema<D> = DynamicSchemaItemProps<'Extra:EmailInput', D>
      type IconPickerSchema<D> = DynamicSchemaItemProps<'Extra:IconPicker', D>
      type LocaleSchema<D> = DynamicSchemaItemProps<'Extra:LocaleSelect', D>
      type PasswordSchema<D> = DynamicSchemaItemProps<'Extra:Password', D>
      type PhoneNumberInputSchema<D> = DynamicSchemaItemProps<'Extra:PhoneNumberInput', D>
      type SMSInputSchema<D> = DynamicSchemaItemProps<'Extra:SMSInput', D>
      type TransitionSelectSchema<D> = DynamicSchemaItemProps<'Extra:TransitionSelect', D>

      // raw
      type DynamicInputSchema<D> = DynamicSchemaItemProps<'Raw:DynamicInput', D>
      type SliderSchema<D> = DynamicSchemaItemProps<'Raw:Slider', D>
      type TreeSelectSchema<D> = DynamicSchemaItemProps<'Raw:TreeSelect', D>

      // business
      type AreaCacaderSchema<D> = DynamicSchemaItemProps<'Business:AreaCascader', D>
      type DictSchema<D> = DynamicSchemaItemProps<'Business:Dict', D>

      // extend
      type QuerySchema<D> = DynamicSchemaItemProps<'Extend:Query', D>
      type DividerSchema<D> = DynamicSchemaItemProps<'Extend:Divider', D, {
        // since sticky element will got a transparent background, so we need to provide a bgColor
        sticky: boolean
        bgColor: string
      }>
    }

    type Item<D = any> =
      | SchemaItem.DividerSchema<D>

      | SchemaItem.RoleSelectSchema<D>
      | SchemaItem.TinymceSchema<D>

      // base
      | SchemaItem.RenderSchema<D>
      | SchemaItem.SlotSchema<D>

      // ui
      | SchemaItem.ButtonSchema<D>
      | SchemaItem.ButtonConfirmSchema<D>
      | SchemaItem.ButtonGroupSchema<D>
      | SchemaItem.ButtonRetry<D>
      | SchemaItem.CheckboxSchema<D>
      | SchemaItem.ColorPickerSchema<D>
      | SchemaItem.DatePickerSchema<D>
      | SchemaItem.DynamicTagsSchema<D>
      | SchemaItem.InputSchema<D>
      | SchemaItem.InputNumberSchema<D>
      | SchemaItem.RadioSchema<D>
      | SchemaItem.SelectSchema<D>
      | SchemaItem.SwitchSchema<D>
      | SchemaItem.TimePickerSchema<D>
      | SchemaItem.TreeSchema<D>

      // extra
      | SchemaItem.EmailInputSchema<D>
      | SchemaItem.IconPickerSchema<D>
      | SchemaItem.LocaleSchema<D>
      | SchemaItem.PasswordSchema<D>
      | SchemaItem.PhoneNumberInputSchema<D>
      | SchemaItem.SMSInputSchema<D>
      | SchemaItem.TransitionSelectSchema<D>

      // raw
      | SchemaItem.DynamicInputSchema<D>
      | SchemaItem.SliderSchema<D>
      | SchemaItem.TreeSelectSchema<D>

      // business
      | SchemaItem.AreaCacaderSchema<D>
      | SchemaItem.DictSchema<D>

      // extend
      | SchemaItem.QuerySchema<D>
  }
}
