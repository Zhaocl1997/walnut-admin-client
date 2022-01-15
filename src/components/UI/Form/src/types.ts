import type {
  GridItemProps,
  FormItemProps,
  FormInst,
  SliderProps,
  DividerProps,
  H3Props,
  DynamicInputProps,
  TreeSelectProps,
  TreeProps,
  FormItemRule,
} from 'naive-ui'

import type { WTransitionProps } from '/@/components/Extra/Transition'
import type { useEventParams } from '/@/hooks/component/useEvent'

import type { WButtonProps } from '../../Button'
import type { WButtonGroupProps } from '../../ButtonGroup'
import type { WInputProps } from '../../Input'
import type { WInputNumberProps } from '../../InputNumber'
import type { WSelectProps } from '../../Select'
import type { WRadioProps } from '../../Radio'
import type { WCheckboxProps } from '../../Checkbox'
import type { WSwitchProps } from '../../Switch'
import type { WTimePickerProps } from '../../TimePicker'
import type { WDatePickerProps } from '../../DatePicker'
import type { WDynamicTagsProps } from '../../DynamicTags'

import type { WFormPropType } from './props'

export enum BUILTIN_FORM_TYPE {
  Button,
  ButtonGroup,
  Input,
  InputNumber,
  Select,
  Radio,
  Checkbox,
  Switch,
  TimePicker,
  DatePicker,
  DynamicTags,
}

export declare namespace WForm {
  type preset = 'modal' | 'drawer'

  namespace Inst {
    type NFormInst = FormInst

    interface WFormInst {
      validate: () => Promise<boolean> | undefined
      restoreValidation: Fn
      setProps: Fn
      onOpen: (beforeHook?: Fn) => void
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
      Pick<Inst.WFormInst, 'validate' | 'restoreValidation' | 'onOpen'>
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
      | useEventParams<'query', any>
      | useEventParams<'reset', any>
      | useEventParams<'hook', Inst.WFormInst>
  }

  namespace Events {
    type Callback<T = any, R = void> = (params: Params.Callback<T>) => R
  }

  namespace Schema {
    interface DomProps {
      style?: Partial<CSSStyleDeclaration>
      class?: string
    }

    interface ComponentPropPool<D = any> {
      'Extend:Divider': {
        title?: string
        helpMessage?: string
        foldable?: boolean
        startIndex?: number
        endIndex?: number
      } & Pick<DividerProps, 'titlePlacement' | 'dashed'> &
        Pick<H3Props, 'prefix' | 'type'>

      'Extend:Query': {
        countToFold?: number
        foldable?: boolean
      }

      'Extend:IconPicker': {}
      'Extend:RoleSelect': {
        multiple?: boolean
        valueSeparator?: string
        valueType?: 'string' | 'number'
      }

      'Base:Render': {
        render: Events.Callback<D, VNode | VNode[] | string>
      }
      'Base:Slot': {}
      'Base:DynamicInput': DynamicInputProps

      'Base:Button': WButtonProps
      'Base:ButtonGroup': WButtonGroupProps
      'Base:Input': WInputProps
      'Base:InputNumber': WInputNumberProps
      'Base:Select': WSelectProps
      'Base:Radio': WRadioProps
      'Base:Checkbox': WCheckboxProps
      'Base:Switch': WSwitchProps & {
        checkedText?: string
        uncheckedText?: string
      }

      'Base:TimePicker': WTimePickerProps
      'Base:DatePicker': WDatePickerProps
      'Base:DynamicTags': WDynamicTagsProps
      'Base:Slider': SliderProps
      'Base:TreeSelect': TreeSelectProps
      'Base:Tree': TreeProps
    }

    interface DynamicSchemaItemProps<
      T extends keyof ComponentPropPool,
      D,
      EP = any
    > {
      foldShow?: boolean

      type: T

      componentProp?: ComponentPropPool<D>[T] & DomProps

      formProp?: Omit<FormItemProps, 'rule'> & {
        /**
         * @override
         * @description add boolean type to rule
         * Set `rule` false when set `baseRules` true but this form item uses no rule
         */
        rule?: FormItemRule | FormItemRule[] | undefined | boolean

        /**
         * @description Used for render/slot typed item, whether apply the default base rules
         */
        baseRuleApplied?: boolean

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
    }

    type DividerSchema<D> = DynamicSchemaItemProps<'Extend:Divider', D>
    type QuerySchema<D> = DynamicSchemaItemProps<'Extend:Query', D>
    type IconPickerSchema<D> = DynamicSchemaItemProps<'Extend:IconPicker', D>
    type RoleSelectSchema<D> = DynamicSchemaItemProps<'Extend:RoleSelect', D>

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
      | IconPickerSchema<D>
      | RoleSelectSchema<D>
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
      | SwitchSchema<D>
      | TimePickerSchema<D>
      | DatePickerSchema<D>
      | DynamicTagsSchema<D>
      | SliderSchema<D>
      | TreeSelectSchema<D>
      | TreeSchema<D>
  }
}
