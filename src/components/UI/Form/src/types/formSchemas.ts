import type { WFormSchemaItemType } from '.'
import type { WFormItemRule } from './formProps'

import type { WButtonProps } from '/@/components/UI/Button'
import type { WInputProps } from '/@/components/UI/Input'
import type { WInputNumberProps } from '/@/components/UI/InputNumber'
import type { WSelectProps } from '/@/components/UI/Select'
import type { WCheckboxProps } from '/@/components/UI/Checkbox'
import type { WButtonGroupProps } from '/@/components/UI/ButtonGroup'
import type { WRadioProps } from '/@/components/UI/Radio'
import type { WTreeProps } from '/@/components/UI/Tree'

/**
 * @description see more https://element-plus.gitee.io/#/zh-CN/component/form#form-item-attributes
 */
export interface WFormSchemaItemProp {
  prop: string
  label: string
  labelWidth: string
  required: boolean
  rules: WFormItemRule[]
  error: string
  showMessage: boolean
  inlineMessage: boolean
  size: ComponentSize
}

export interface wColReponsiveProp {
  span?: number
  offset?: number
}

/**
 * @description see more https://element-plus.gitee.io/#/zh-CN/component/layout#col-attributes
 */
export interface WFormSchemaItemCol {
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
export interface WFormSchemaItemEvent {
  onInput: (e: any) => void
  onChange: (e: any) => void
  onFocus: (e: any) => void
  onBlur: (e: any) => void
  onClear: (e: any) => void
  onClick: (e: any) => void
  onKeyup: (e: any) => void
}

type wFormComponentType =
  | WInputProps
  | WInputNumberProps
  | WButtonProps
  | WButtonGroupProps
  | WSelectProps
  | WCheckboxProps
  | WRadioProps
  | WTreeProps

interface OriginalDomInterface {
  style: Partial<CSSStyleDeclaration>
}

/**
 * @description Form schema item interface
 */
export interface WFormSchemaItem {
  type: WFormSchemaItemType

  formProp?: Partial<WFormSchemaItemProp>

  /* TODO use different interface depend on type input */
  componentProp?: wFormComponentType &
    Partial<WFormSchemaItemEvent> &
    Partial<OriginalDomInterface>

  colProp?: Partial<WFormSchemaItemCol>

  visible?: boolean

  foldVisible?: boolean
}
