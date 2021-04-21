export interface ElInputTextareaResizeProp {
  minRows?: number
  maxRows?: number
}

/**
 * @link https://element-plus.gitee.io/#/zh-CN/component/input#input-attributes
 */
export interface ElInputProps {
  type: string
  modelValue: string | number
  maxlength: string | number
  minlength: string | number
  showWordLimit: boolean
  placeholder: MaybeRef<string>
  clearable: boolean
  showPassword: boolean
  disabled: boolean
  size: ComponentSize
  prefixIcon: string
  suffixIcon: string
  rows: string | number
  autosize: boolean | ElInputTextareaResizeProp
  autocomplete: 'on' | 'off'
  name: string
  readonly: boolean
  max: string | number
  min: string | number
  step: string | number
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
  prepend?: string
  append?: string
  debounce?: number
}
