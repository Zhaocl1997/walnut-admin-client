import type { ElInputRef } from '../../../Input'

/**
 * @link https://element-plus.gitee.io/#/zh-CN/component/input-number#attributes
 */
export interface ElInputNumberProps {
  modelValue: number | undefined
  min: number
  max: number
  step: number
  setpStrictly: boolean
  precision: number
  size: ComponentSize | 'large'
  disabled: boolean
  controls: boolean
  controlsPosition: 'right' | undefined
  name: string
  label: string
  placeholder: string
}

/**
 * @description extend from `ElInputNumber` props
 */
export type WInputNumberProps = Partial<ElInputNumberProps>

/**
 * @link https://element-plus.gitee.io/#/zh-CN/component/input-number#methods
 */
export interface ElInputNumberRef {
  input: ElInputRef
}
