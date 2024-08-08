import type {
  DynamicInputProps,
  FormInst,
  FormItemProps,
  FormItemRule,
  GridItemProps,
  SliderProps,
  TreeSelectProps,
} from 'naive-ui'

import type { WButtonProps } from '../../Button'
import type { WButtonGroupProps } from '../../ButtonGroup'
import type { WInputProps } from '../../Input'
import type { WInputNumberProps } from '../../InputNumber'
import type { WSelectProps } from '../../Select'
import type { WRadioProps } from '../../Radio'
import type { WCheckboxProps } from '../../Checkbox'
import type { ICompUISwitchPropsPartial } from '../../Switch'
import type { WTimePickerProps } from '../../TimePicker'
import type { WDatePickerProps } from '../../DatePicker'
import type { WDynamicTagsProps } from '../../DynamicTags'
import type { WTree } from '../../Tree'
import type { WColorPickerProps } from '../../ColorPicker'

import type { WDescriptionsItem } from '../../Descriptions'

import type { WFormPropType } from './props'
import type {
  WFormItemDictProps,
  WFormItemDividerProps,
  WFormItemQueryProps,
} from './components/Extend/types'
import type { TinymceEditorProps } from '@/components/Vendor/Tinymce'
import type { WPasswordProps } from '@/components/Extra/Password'
import type { WSMSInputProps } from '@/components/Extra/SMSInput'
import type { useEventParams } from '@/hooks/component/useEvent'
import type { WLocaleSelectProps } from '@/components/Extra/LocaleSelect'
import type { WAreaCascaderProps } from '@/components/Advanced/AreaCascader'
import type { WTransitionProps } from '@/components/Extra/Transition'
import type { WPhoneNumberInputProps } from '@/components/Extra/PhoneNumberInput'
import type { WEmailInputProps } from '@/components/Extra/EmailInput'

export declare type RuleType = 'string' | 'number' | 'boolean' | 'method' | 'regexp' | 'integer' | 'float' | 'array' | 'object' | 'enum' | 'date' | 'url' | 'hex' | 'email' | 'pattern' | 'any'

export const BUILTIN_FORM_TYPE = [
  'Button',
  'ButtonGroup',
  'Checkbox',
  'ColorPicker',
  'DatePicker',
  'DynamicTags',
  'Input',
  'InputNumber',
  'Radio',
  'Select',
  'Switch',
  'TimePicker',
  'Tree',
] as const

export declare namespace WForm {
  type preset = 'modal' | 'drawer'

  type LocaleType = 'origin' | 'helpMsg' | 'rule' | 'placeholder'

  type MaybeBooleanField = 'vIf' | 'vShow'

  type DictComponentType = 'select' | 'checkbox' | 'radio'

  interface FinishLoading { done: Fn }

  type onFinishFormLoadingCallback = Fn<FinishLoading, void | Promise<void>>

  namespace Inst {
    type NFormInst = FormInst

    interface WFormInst {
      validate: (fields?: string[]) => Promise<boolean> | undefined
      restoreValidation: Fn
      setProps: Fn
      onOpen: (beforeHook?: Fn) => Promise<void>
      onClose: Fn
      onYes: (
        apiHandler: (apiFn: Fn, params: RowData) => Promise<void>,
        done: () => void
      ) => void
      onNo: Fn
    }
  }

  namespace Hook {
    type useFormReturnType = [
      (instance: Inst.WFormInst) => void,
      Pick<Inst.WFormInst, 'validate' | 'restoreValidation' | 'onOpen'>,
    ]
  }

  interface Props<D = any> extends Partial<Omit<WFormPropType, 'schemas'>> {
    schemas?: Schema.Item<D>[]
  }

  interface Context {
    formRef: Ref<Nullable<Inst.NFormInst>>
    formProps: ComputedRef<Props>
    formSchemas: Ref<Schema.Item[]>
    formEvent: (val: Params.Entry) => void
    setProps: (val: Props) => void
  }

  namespace Params {
    interface Callback<T = any> {
      formData: T
    }

    type Entry =
      | useEventParams<'query', FinishLoading>
      | useEventParams<'reset', FinishLoading>
      | useEventParams<'hook', Inst.WFormInst>
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
      'Base:Render': {
        render: Events.Callback<D, VNode | VNode[] | string>
      }
      'Base:Slot': Record<string, never>

      'Base:DynamicInput': DynamicInputProps
      'Base:Slider': SliderProps
      'Base:TreeSelect': TreeSelectProps

      'Base:Button': WButtonProps
      'Base:ButtonGroup': WButtonGroupProps
      'Base:Input': WInputProps
      'Base:InputNumber': WInputNumberProps
      'Base:Select': WSelectProps
      'Base:Radio': WRadioProps
      'Base:Checkbox': WCheckboxProps
      'Base:ColorPicker': WColorPickerProps
      'Base:Switch': ICompUISwitchPropsPartial
      'Base:TimePicker': WTimePickerProps
      'Base:DatePicker': WDatePickerProps
      'Base:DynamicTags': WDynamicTagsProps
      'Base:Tree': WTree.Props

      'Extend:Divider': WFormItemDividerProps
      'Extend:Query': WFormItemQueryProps

      'Extend:IconPicker': Record<string, never>
      'Extend:TransitionSelect': Record<string, never>
      'Extend:RoleSelect': {
        multiple?: boolean
        valueSeparator?: string
        valueType?: 'string' | 'number'
      }
      'Extend:AreaCascader': WAreaCascaderProps
      'Extend:Password': WPasswordProps
      'Extend:SMSInput': WSMSInputProps
      'Extend:Dict': WFormItemDictProps
      'Extend:LocaleSelect': WLocaleSelectProps
      'Extend:PhoneNumberInput': WPhoneNumberInputProps
      'Extend:EmailInput': WEmailInputProps

      'Vendor:Tinymce': TinymceEditorProps
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
        defaultValue?: BaseDataType | BaseDataType[] | undefined | null

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

      gridProp?: GridItemProps

      transitionProp?: Omit<Partial<WTransitionProps>, 'group'>

      extraProp?: Partial<EP> & {
        /**
         * @description v-if control visible
         */
        vIf?: boolean | Events.Callback<D, boolean>

        /**
         * @description v-show control visible
         */
        vShow?: boolean | Events.Callback<D, boolean>
      }

      descriptionProp?: Partial<WDescriptionsItem<D>>
    }

    type DividerSchema<D> = DynamicSchemaItemProps<
      'Extend:Divider',
      D,
      {
        // since sticky element will got a transparent background, so we need to provide a bgColor
        sticky: boolean
        bgColor: string
      }
    >
    type QuerySchema<D> = DynamicSchemaItemProps<'Extend:Query', D>
    type DictSchema<D> = DynamicSchemaItemProps<'Extend:Dict', D>
    type LocaleSchema<D> = DynamicSchemaItemProps<'Extend:LocaleSelect', D>
    type PhoneNumberInputSchema<D> = DynamicSchemaItemProps<'Extend:PhoneNumberInput', D>
    type EmailInputSchema<D> = DynamicSchemaItemProps<'Extend:EmailInput', D>
    type IconPickerSchema<D> = DynamicSchemaItemProps<'Extend:IconPicker', D>
    type TransitionSelectSchema<D> = DynamicSchemaItemProps<
      'Extend:TransitionSelect',
      D
    >
    type RoleSelectSchema<D> = DynamicSchemaItemProps<'Extend:RoleSelect', D>
    type AreaCacaderSchema<D> = DynamicSchemaItemProps<'Extend:AreaCascader', D>
    type PasswordSchema<D> = DynamicSchemaItemProps<'Extend:Password', D>
    type SMSInputSchema<D> = DynamicSchemaItemProps<'Extend:SMSInput', D>

    type TinymceSchema<D> = DynamicSchemaItemProps<'Vendor:Tinymce', D>

    type RenderSchema<D> = DynamicSchemaItemProps<'Base:Render', D>
    type SlotSchema<D> = DynamicSchemaItemProps<'Base:Slot', D>
    type DynamicInputSchema<D> = DynamicSchemaItemProps<'Base:DynamicInput', D>

    type ButtonSchema<D> = DynamicSchemaItemProps<'Base:Button', D>
    type ButtonGroupSchema<D> = DynamicSchemaItemProps<'Base:ButtonGroup', D>
    type InputSchema<D> = DynamicSchemaItemProps<'Base:Input', D>
    type InputNumberSchema<D> = DynamicSchemaItemProps<'Base:InputNumber', D>
    type SelectSchema<D> = DynamicSchemaItemProps<'Base:Select', D>
    type RadioSchema<D> = DynamicSchemaItemProps<'Base:Radio', D>
    type CheckboxSchema<D> = DynamicSchemaItemProps<'Base:Checkbox', D>
    type ColorPickerSchema<D> = DynamicSchemaItemProps<'Base:ColorPicker', D>
    type SwitchSchema<D> = DynamicSchemaItemProps<'Base:Switch', D>
    type TimePickerSchema<D> = DynamicSchemaItemProps<'Base:TimePicker', D>
    type DatePickerSchema<D> = DynamicSchemaItemProps<'Base:DatePicker', D>
    type DynamicTagsSchema<D> = DynamicSchemaItemProps<'Base:DynamicTags', D>
    type SliderSchema<D> = DynamicSchemaItemProps<'Base:Slider', D>
    type TreeSelectSchema<D> = DynamicSchemaItemProps<'Base:TreeSelect', D>
    type TreeSchema<D> = DynamicSchemaItemProps<'Base:Tree', D>

    type Item<D = any> =
      | DividerSchema<D>
      | QuerySchema<D>
      | DictSchema<D>
      | LocaleSchema<D>
      | PhoneNumberInputSchema<D>
      | EmailInputSchema<D>
      | IconPickerSchema<D>
      | TransitionSelectSchema<D>
      | RoleSelectSchema<D>
      | AreaCacaderSchema<D>
      | PasswordSchema<D>
      | SMSInputSchema<D>
      | TinymceSchema<D>
      | RenderSchema<D>
      | SlotSchema<D>
      | DynamicInputSchema<D>
      | ButtonSchema<D>
      | ButtonGroupSchema<D>
      | InputSchema<D>
      | InputNumberSchema<D>
      | SelectSchema<D>
      | RadioSchema<D>
      | CheckboxSchema<D>
      | ColorPickerSchema<D>
      | SwitchSchema<D>
      | TimePickerSchema<D>
      | DatePickerSchema<D>
      | DynamicTagsSchema<D>
      | SliderSchema<D>
      | TreeSelectSchema<D>
      | TreeSchema<D>
  }
}
