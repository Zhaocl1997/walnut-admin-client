import type { MultiTypeCompSharedPropType } from '../../../types'

/**
 * @link https://element-plus.gitee.io/#/zh-CN/component/tag#checktag-attributes
 */
export interface ElCheckTagProps {
  checked: boolean
}

/**
 * @description w-check-tag option item type
 */
export type WCheckTagOptionItemType = BaseOptionItemType<
  'value',
  'label',
  { checked: boolean; disabled: boolean }
>

/**
 * @description extend from `ElCheckTagProps` props
 */
export interface WCheckTagProps
  extends Partial<ElCheckTagProps>,
    Partial<MultiTypeCompSharedPropType> {
  modelValue?: string[] | boolean[] | number[] | string | boolean | number
}
