import type { MultiTypeCompSharedPropType } from '../../../types'

/**
 * @description see more https://element-plus.gitee.io/#/zh-CN/component/checkbox#checkbox-group-attributes
 */
export interface ElCheckboxGroupProps {
  modelValue: string[] | boolean[] | number[] | string | boolean | number
  size: ComponentSize
  disabled: boolean
  min: number
  max: number
  textColor: string
  fill: string
}

/**
 * @description extend from `ElCheckboxGroup` props
 */
export interface WCheckboxProps
  extends Partial<MultiTypeCompSharedPropType>,
    Partial<ElCheckboxGroupProps> {
  text?: MaybeRef<string>
}
