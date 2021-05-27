import type { VNode, ComputedRef, Ref } from 'vue'
import type { MaybeRef, MaybeRefRecord } from '/~/utils'

import type { WButtonProps } from '/@/components/UI/Button'
import type { WButtonGroupProps } from '/@/components/UI/ButtonGroup'
import type { WInputProps } from '/@/components/UI/Input'
import type { WInputNumberProps } from '/@/components/UI/InputNumber'
import type { WSelectProps } from '/@/components/UI/Select'
import type { WCheckboxProps } from '/@/components/UI/Checkbox'
import type { WRadioProps } from '/@/components/UI/Radio'
import type { WTreeProps } from '/@/components/UI/Tree'
import type { WSelectTreeProp } from '/@/components/UI/SelectTree'
import type { WSwitchProps } from '/@/components/UI/Switch'

/**
 * @description WForm Type Module
 */
export declare namespace WForm {
  /**
   * @description layout props
   */
  namespace ElLayout {
    interface ColResponsiveProps {
      span?: number
      offset?: number
    }

    /**
     * @link https://element-plus.gitee.io/#/zh-CN/component/layout#col-attributes
     */
    interface ColProps {
      span: number
      offset: number
      push: number
      pull: number

      xs: number | ColResponsiveProps
      sm: number | ColResponsiveProps
      md: number | ColResponsiveProps
      lg: number | ColResponsiveProps
      xl: number | ColResponsiveProps

      tag: string
    }
  }

  /**
   * @description el-form relatives
   */
  namespace ElForm {
    interface Rule {
      type?: string
      required?: boolean
      message?: string
      trigger?: 'blur' | 'change' | ['blur', 'change']
      validator?: Fn
    }

    interface RuleRecord {
      [key: string]: Rule[]
    }

    /**
     * @link https://element-plus.gitee.io/#/zh-CN/component/form#form-item-attributes
     */
    interface ItemProps {
      prop: string
      label: string
      labelWidth: string
      required: boolean
      rules: Rule[]
      error: string
      showMessage: boolean
      inlineMessage: boolean
      size: ComponentSize
    }

    type LabelPosition = 'right' | 'left' | 'top'

    /**
     * @link https://element-plus.gitee.io/#/zh-CN/component/form#form-attributes
     */
    interface Props<T = any> {
      model: T
      rules: RuleRecord
      inline: boolean
      labelPosition: LabelPosition

      /**
       * @override
       * @description override original labelWidth with `auto`
       * @type {String}
       * @default auto
       */
      labelWidth: string
      labelSuffix: string
      hideRequiredAsterisk: boolean
      showMessage: boolean
      inlineMessage: boolean
      statusIcon: boolean
      validateOnRuleChange: boolean
      size: ComponentSize
      disabled: boolean
    }

    /**
     * @link https://element-plus.gitee.io/#/zh-CN/component/form#form-methods
     */
    interface Methods {
      validate: (valid?: boolean, result?: RuleRecord) => Promise<boolean>
      validateField: (
        props?: string | string[],
        callback?: (errMessage?: string) => void
      ) => Promise<boolean>
      resetFields: () => Promise<void>
      clearValidate: (props?: string | string[]) => Promise<void>
    }
  }

  /**
   * @description w-form context
   */
  interface Context {
    formProps: ComputedRef<Props>
    formSchemas: Ref<Schema.Item[]>
  }

  /**
   * @description w-form params
   */
  namespace Params {
    interface Callback<T = any> {
      formData: T
    }
  }

  /**
   * @description w-form events
   */
  namespace Events {
    type Callback<T = any, R = void> = (params: Params.Callback<T>) => R
  }

  /**
   * @description w-form methods
   */
  interface Methods extends ElForm.Methods {
    setProps: (props: Props) => void
  }

  /**
   * @description w-form props
   */
  interface Props<T = any> extends Partial<MaybeRefRecord<ElForm.Props<T>>> {
    /**
     * @description v-model value for form
     */
    modelValue?: T

    /**
     * @description Form model to render relevant component
     */
    schemas?: MaybeRef<Schema.Item<T>[]>

    /**
     * @description Form item gutter provided by el-row
     */
    gutter?: number

    /**
     * @description Form item span provided by el-col
     */
    span?: number

    /**
     * @description Used for query form
     */
    defaultFold?: boolean

    /**
     * @description Used for query form
     */
    countToFold?: number

    /**
     * @description Used for mock button with mockjs
     */
    mock?: boolean

    /**
     * @description Weather the form is query form
     */
    query?: boolean

    /**
     * @description Normally used for query form. Force to shrink `el-form-item` `margin-bottom` a little bit.
     */
    compact?: MaybeRef<boolean>
  }

  /**
   * @description w-form schema
   */
  namespace Schema {
    interface DomProps {
      style?: Partial<CSSStyleDeclaration>
      class?: string
    }

    /**
     * @description there generic pararms
     * First is component type like `input`/`select` etc
     * Second is custom `componentProp` for current type\
     * Last is `formData` type, maybe any
     */
    interface Custom<T, CP, EP, D> {
      /**
       * @description schema type
       */
      type: T

      /**
       * @description target type component prop
       */
      componentProp?: CP & DomProps

      /**
       * @description Refer to ElFormItemProp
       */
      formProp?: Partial<ElForm.ItemProps>

      /**
       * @description Refer to ColProps
       */
      colProp?: Partial<ElLayout.ColProps>

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
        VVC?: Events.Callback<D, boolean> | MaybeRef<boolean>
      }

      /**
       * @description fold-show flag
       */
      foldShow?: boolean
    }

    /**
     * @description JSX Render Schema
     */
    type RenderSchema<D> = Custom<
      'Render',
      {
        /**
         * @description JSX render function
         */
        render?: Events.Callback<D, VNode | VNode[] | string>
      },
      any,
      D
    >

    /**
     * @description Slot Schema
     */
    type SlotSchema<D> = Custom<'Slot', any, any, D>

    /**
     * @description Divider Schema
     */
    type DividerSchema<D> = Custom<
      'Divider',
      {
        /**
         * @description divider dividable flag
         */
        foldable?: boolean

        /**
         * @description divider title
         */
        title?: string

        /**
         * @description divider fold state
         */
        fold?: boolean

        /**
         * @description divider count to fold
         */
        countToFold?: number

        /**
         * @description divider children
         */
        children?: Schema.Item<D>[]
      },
      any,
      D
    >

    /**
     * @description Button Schema
     */
    type ButtonSchema<D> = Custom<'Button', WButtonProps, any, D>

    /**
     * @description Button Group Schema
     */
    type ButtonGroupSchema<D> = Custom<'ButtonGroup', WButtonGroupProps, any, D>

    /**
     * @description Input Schema
     */
    type InputSchema<D> = Custom<'Input', WInputProps, any, D>

    /**
     * @description Input number Schema
     */
    type InputNumberSchema<D> = Custom<'InputNumber', WInputNumberProps, any, D>

    /**
     * @description Select Schema
     */
    type SelectSchema<D> = Custom<'Select', WSelectProps, any, D>

    /**
     * @description Checkbox Schema
     */
    type CheckboxSchema<D> = Custom<'Checkbox', WCheckboxProps, any, D>

    /**
     * @description Radio Schema
     */
    type RadioSchema<D> = Custom<'Radio', WRadioProps, any, D>

    /**
     * @description Tree Schema
     */
    type TreeSchema<D> = Custom<'Tree', WTreeProps, any, D>

    /**
     * @description Select Tree Schema
     */
    type SelectTreeSchema<D> = Custom<'SelectTree', WSelectTreeProp, any, D>

    /**
     * @description Switch Schema
     */
    type SwitchSchema<D> = Custom<'Switch', WSwitchProps, any, D>

    // entry to schema item
    type Item<D = any> =
      | RenderSchema<D> // JSX
      | SlotSchema<D> // Slot
      | DividerSchema<D> // Divider
      | ButtonSchema<D>
      | ButtonGroupSchema<D>
      | InputSchema<D>
      | InputNumberSchema<D>
      | SelectSchema<D>
      | CheckboxSchema<D>
      | RadioSchema<D>
      | TreeSchema<D>
      | SelectTreeSchema<D>
      | SwitchSchema<D>
  }
}
