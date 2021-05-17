import type { CommonComponentMethods } from '../../../types'
import type { MaybeRef } from '/~/utils'

export interface ElInputTextareaResizeProp {
  minRows?: number
  maxRows?: number
}

/**
 * @link https://element-plus.gitee.io/#/zh-CN/component/input#input-attributes
 */
export interface ElInputProps {
  type: string
  modelValue: StringOrNumber
  maxlength: StringOrNumber
  minlength: StringOrNumber
  showWordLimit: boolean
  placeholder: MaybeRef<string>
  clearable: boolean
  showPassword: boolean
  disabled: boolean
  size: ComponentSize
  prefixIcon: string
  suffixIcon: string
  rows: StringOrNumber
  autosize: boolean | ElInputTextareaResizeProp
  autocomplete: 'on' | 'off'
  name: string
  readonly: boolean
  max: StringOrNumber
  min: StringOrNumber
  step: StringOrNumber
  resize: 'none' | 'both' | 'horizontal' | 'vertical'
  autofocus: boolean
  form: string
  label: string
  tabindex: string
  validateEvent: boolean
}

export type WInputSlotPosition = 'prefix' | 'suffix' | 'prepend' | 'append'

export interface WInputModifiers {
  capitalize: boolean
  uppercase: boolean
  camel: boolean
  trim: boolean
  number: boolean
  lazy: boolean
}

/**
 * @description extend from `ElInput` props
 */
export interface WInputProps extends Partial<ElInputProps> {
  /**
   * @description default set trim true
   */
  modelModifiers?: Partial<WInputModifiers>
  blackList?: string[]
  helpMessage?: string
  helpPosition?: WInputSlotPosition
  prepend?: MaybeRef<string>
  append?: string
  debounce?: number
}

/**
 * @link https://element-plus.gitee.io/#/zh-CN/component/input#input-methods
 */
export interface ElInputRef extends CommonComponentMethods {
  select: (e?: Event) => void
}
