import type { WFormSchemaItem } from './formSchemas'

/**
 * @link https://element-plus.gitee.io/#/zh-CN/component/form#biao-dan-yan-zheng
 */
export interface ElFormItemRule {
  type?: string
  required?: boolean
  message?: string
  trigger?: 'blur' | 'change' | ['blur', 'change']
  validator?: Fn
}

export interface WFormRule {
  [key: string]: ElFormItemRule[]
}

/**
 * @link https://element-plus.gitee.io/#/zh-CN/component/form#form-attributes
 */
export interface ElFormProps {
  model: Recordable
  rules: MaybeRef<WFormRule>
  inline: boolean
  labelPosition: 'right' | 'left' | 'top'

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
 * @description extend from `ElForm` props
 */
export interface WFormProps extends Partial<ElFormProps> {
  /**
   * @description v-model value for form
   * @type {Object}
   */
  modelValue: Recordable

  /**
   * @description Form model to render relevant component
   * @type {Array}
   */
  schemas?: MaybeRef<WFormSchemaItem[]>

  /**
   * @description Form item gutter provided by el-row
   * @type {Number}
   * @default 0
   */
  gutter?: number

  /**
   * @description Form item span provided by el-col
   * @type {Number}
   * @default 24
   */
  span?: number

  /**
   * @description Used for query form
   * @type {Boolean}
   * @default false
   */
  defaultFold?: boolean

  /**
   * @description Used for query form
   * @type {Number}
   * @default 3
   */
  countToFold?: number

  /**
   * @description Used for mock button with mockjs
   * @type {Boolean}
   * @default false
   */
  mock?: boolean

  /**
   * @description Weather the form is query form
   * @type {Boolean}
   * @default false
   */
  query?: boolean

  /**
   * @description Normally used for query form. Force to shrink `el-form-item` `margin-bottom` a little less.
   * @type {Boolean}
   * @default false
   */
  compact?: boolean
}
