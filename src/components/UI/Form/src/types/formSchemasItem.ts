import type { VNode } from 'vue'
import type { ElFormItemRule } from './formProps'

import type { WButtonProps } from '/@/components/UI/Button'
import type { WButtonGroupProps } from '/@/components/UI/ButtonGroup'
import type { WInputProps } from '/@/components/UI/Input'
import type { WInputNumberProps } from '/@/components/UI/InputNumber'
import type { WSelectProps } from '/@/components/UI/Select'
import type { WCheckboxProps } from '/@/components/UI/Checkbox'
import type { WRadioProps } from '/@/components/UI/Radio'
import type { WTreeProps } from '/@/components/UI/Tree'
import type { WSelectTreeProp } from '/@/components/UI/SelectTree'
import { MaybeRef } from '/~/utils'

/**
 * @link https://element-plus.gitee.io/#/zh-CN/component/form#form-item-attributes
 */
interface ElFormItemProp {
  prop: string
  label: string
  labelWidth: string
  required: boolean
  rules: ElFormItemRule[]
  error: string
  showMessage: boolean
  inlineMessage: boolean
  size: ComponentSize
}

interface wColReponsiveProp {
  span?: number
  offset?: number
}

/**
 * @link https://element-plus.gitee.io/#/zh-CN/component/layout#col-attributes
 */
interface ElColProp {
  span: number
  offset: number
  push: number
  pull: number

  xs: number | wColReponsiveProp
  sm: number | wColReponsiveProp
  md: number | wColReponsiveProp
  lg: number | wColReponsiveProp
  xl: number | wColReponsiveProp

  tag: string
}

/**
 * @description Form schema event
 */
export interface SharedFormComponentEvent {
  onInput: (e: any) => void
  onChange: (e: any) => void
  onFocus: (e: any) => void
  onBlur: (e: any) => void
  onClear: (e: any) => void
  onClick: (e: any) => void
  onKeyup: (e: any) => void
}

/**
 * @description now only include style
 */
interface SharedDomProp {
  style: Partial<CSSStyleDeclaration>
  class: string
}

/**
 * @description shared component prop, for now only have events and style
 */
type SharedComponentProp = Partial<SharedFormComponentEvent> &
  Partial<SharedDomProp>

// TODO type support
export interface WFormCallback {
  formData: Recordable
}

/**
 * @description shared schema
 */
interface SharedSchema<T, P> {
  /**
   * @description schema type
   */
  type: T

  /**
   * @description target type component prop
   */
  componentProp?: P & SharedComponentProp

  /**
   * @description Refer to ElFormItemProp
   */
  formProp?: Partial<ElFormItemProp>

  /**
   * @description Refer to ElColProp
   */
  colProp?: Partial<ElColProp>

  /**
   * @description v-if control visible
   */
  vIf?: ((cb: WFormCallback) => boolean) | MaybeRef<boolean>

  /**
   * @description v-show control visible
   */
  vShow?: ((cb: WFormCallback) => boolean) | MaybeRef<boolean>

  visible?: ((cb: WFormCallback) => boolean) | boolean
}

/**
 * @description JSX Render Schema
 */
export type RenderSchema = SharedSchema<'Render', any> & {
  /**
   * @description JSX render function
   */
  render?: (cb: WFormCallback) => VNode | VNode[] | string
}

/**
 * @description Slot Schema
 */
export type SlotSchema = SharedSchema<'Slot', any>

/**
 * @description Button Schema
 */
export type ButtonSchema = SharedSchema<'Button', WButtonProps>

/**
 * @description Button Group Schema
 */
export type ButtonGroupSchema = SharedSchema<'ButtonGroup', WButtonGroupProps>

/**
 * @description Input Schema
 */
export type InputSchema = SharedSchema<'Input', WInputProps>

/**
 * @description Input number Schema
 */
export type InputNumberSchema = SharedSchema<'InputNumber', WInputNumberProps>

/**
 * @description Select Schema
 */
export type SelectSchema = SharedSchema<'Select', WSelectProps>

/**
 * @description Checkbox Schema
 */
export type CheckboxSchema = SharedSchema<'Checkbox', WCheckboxProps>

/**
 * @description Radio Schema
 */
export type RadioSchema = SharedSchema<'Radio', WRadioProps>

/**
 * @description Tree Schema
 */
export type TreeSchema = SharedSchema<'Tree', WTreeProps>

/**
 * @description Select Tree Schema
 */
export type SelectTreeSchema = SharedSchema<'SelectTree', WSelectTreeProp>
