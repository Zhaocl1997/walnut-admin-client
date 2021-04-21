import type { MultiTypeCompSharedPropType } from '../../../types'

/**
 * @link https://element-plus.gitee.io/#/zh-CN/component/tag#checktag-attributes
 */
export interface ElCheckTagProps {
  checked: boolean
}

/**
 * @description extend from `ElCheckTagProps` props
 */
export interface WCheckTagProps
  extends Partial<ElCheckTagProps>,
    Partial<MultiTypeCompSharedPropType> {
  modelValue?: string[] | boolean[] | number[] | string | boolean | number
}
