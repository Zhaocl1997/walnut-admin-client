/**
 * @link https://element-plus.gitee.io/#/zh-CN/component/switch#attributes
 */
export interface ElSwitchProps {
  modelValue: BaseDataType
  value: BaseDataType
  disabled: boolean
  width: number
  activeIconClass: string
  inactiveIconClass: string
  activeText: string
  inactiveText: string
  activeColor: string
  inactiveColor: string
  activeValue: BaseDataType
  inactiveValue: BaseDataType
  name: string
  validateEvent: boolean
  id: string
  loading: boolean
  beforeChange: () => Promise<boolean> | boolean
}

/**
 * @description extend from `ElSwitchProps` props
 */
export type WSwitchProps = Partial<ElSwitchProps>
