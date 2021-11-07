import type {
  GridItemProps,
  FormProps,
  FormItemProps,
  FormInst,
  SliderProps,
  DividerProps,
  H3Props,
  DynamicInputProps,
  ModalProps,
  DrawerProps,
  DrawerContentProps,
  TreeSelectProps,
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
      onOpen: Fn
      onClose: Fn
      onYes: Fn
      onNo: Fn
    }
  }

  namespace Hook {
    type useFormReturnType = [
      (instance: Inst.WFormInst) => void,
      Pick<Inst.WFormInst, 'validate' | 'restoreValidation' | 'onOpen'>
    ]
  }

  interface Props<D = any> extends FormProps {
    schemas?: Schema.Item<D>[]

    preset?: preset
    advancedProps?: Partial<ModalProps | (DrawerProps & DrawerContentProps)> &
      Pick<Inst.WFormInst, 'onYes' | 'onNo'>

    cols?: number
    span?: number
    xGap?: number
    yGap?: number

    baseRules?: boolean
  }

  interface Context {
    formRef: Ref<Nullable<Inst.NFormInst>>
    formProps: Props
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
    }

    interface DynamicSchemaItemProps<
      T extends keyof ComponentPropPool,
      D,
      EP = any
    > {
      foldShow?: boolean

      type: T

      componentProp?: ComponentPropPool<D>[T] & DomProps

      formProp?: FormItemProps & {
        labelHelpMessage?: string | string[]
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

    type Item<D = any> =
      | DividerSchema<D>
      | QuerySchema<D>
      | IconPickerSchema<D>
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
  }
}
