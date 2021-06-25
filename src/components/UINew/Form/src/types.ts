import type { VNode, Ref, ExtractPropTypes } from 'vue'

import type {
  GridProps,
  GridItemProps,
  FormProps,
  FormItemProps,
  FormItemGiProps,
  FormItemGridItemProps,
  FormInst,
  SliderProps,
  DividerProps,
  H3Props,
} from 'naive-ui'

import type { MaybeRef, MaybeRefRecord } from '/~/utils'

import type { WTransitionProps } from '/@/components/Help/Transition'
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

import { props } from './props'

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
  interface Props<D = any>
    extends FormProps,
      Partial<ExtractPropTypes<typeof props>> {}

  type FormRef = FormInst

  interface Context {
    formRef: Ref<Nullable<FormRef>>
    formProps: Props
    formSchemas: Schema.Item[]
    formEvent: (val: Params.Entry) => void
  }

  namespace Params {
    interface Callback<T = any> {
      formData: T
    }

    type Entry = useEventParams<'query', any> | useEventParams<'reset', any>
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
      'Extend:Render': {
        render: Events.Callback<D, VNode | VNode[] | string>
      }
      'Extend:Slot': {}
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
      }

      'Base:Button': WButtonProps
      'Base:ButtonGroup': WButtonGroupProps
      'Base:Input': WInputProps
      'Base:InputNumber': WInputNumberProps
      'Base:Select': WSelectProps
      'Base:Radio': WRadioProps
      'Base:Checkbox': WCheckboxProps
      'Base:Switch': WSwitchProps
      'Base:TimePicker': WTimePickerProps
      'Base:DatePicker': WDatePickerProps
      'Base:DynamicTags': WDynamicTagsProps
      'Base:Slider': SliderProps
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

      transitionProp?: Omit<WTransitionProps, 'group'>

      extraProp?: Partial<EP> & {
        /**
         * @description v-if control visible
         */
        vIf?: Events.Callback<D, boolean> | MaybeRef<boolean>

        /**
         * @description v-show control visible
         */
        vShow?: Events.Callback<D, boolean> | MaybeRef<boolean>

        /**
         * @description Alias for `Visibility & Value Consistent`
         * Default is true, means that if the invisible item also has v-model value, it will not trigger the value to omitted
         * Set this false, means that as long as item is invisible, its v-model value will be omitted from form data as well
         */
        VVC?: Events.Callback<D, boolean> | boolean
      }
    }

    type RenderSchema<D> = DynamicSchemaItemProps<'Extend:Render', D>
    type SlotSchema<D> = DynamicSchemaItemProps<'Extend:Slot', D>
    type DividerSchema<D> = DynamicSchemaItemProps<'Extend:Divider', D>
    type QuerySchema<D> = DynamicSchemaItemProps<'Extend:Query', D>

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

    type Item<D = any> =
      | RenderSchema<D>
      | SlotSchema<D>
      | DividerSchema<D>
      | QuerySchema<D>
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
  }
}
