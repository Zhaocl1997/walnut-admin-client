import { MultiTypeCompSharedPropType } from '../../../types'

/**
 * @description see more https://element-plus.gitee.io/#/zh-CN/component/radio#radio-group-attributes
 */
export interface ElRadioProps {
  modelValue: string | number | boolean
  size: ComponentSize
  disabled: boolean
  textColor: string
  fill: string
}

/**
 * @description extend from `ElRadioGroup` props
 */
export interface WRadioProps
  extends Partial<
    ElRadioProps & Omit<MultiTypeCompSharedPropType, 'multiple'>
  > {
  button?: boolean
  border?: boolean
}
