import type { MultiTypeCompSharedPropType } from '../../../types'

/**
 * @link https://element-plus.gitee.io/#/zh-CN/component/dropdown#dropdown-attributes
 */
export interface ElDropdownProps {
  type: ComponentType
  size: ComponentSize
  maxHeight: StringOrNumber
  splitButton: boolean
  placement: ComponentPlacement
  trigger: ComponentTrigger
  hideOnClick: boolean
  showTimeout: number
  hideTimeout: number
  tabindex: number
}

/**
 * @description extend from `ElDropdownProps` props
 */
export interface WDropdownProps
  extends Partial<ElDropdownProps>,
    Partial<MultiTypeCompSharedPropType> {
  modelValue?: string[] | boolean[] | number[] | string | boolean | number
}
