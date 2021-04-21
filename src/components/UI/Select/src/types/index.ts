import type { MultiTypeCompSharedPropType } from '../../../types'

/**
 * @description see more https://element-plus.gitee.io/#/zh-CN/component/select#select-attributes
 */
export interface ElSelectProps {
  modelValue: string | number | boolean | Recordable | any[]
  disabled: boolean
  valueKey: string
  size: ComponentSize
  clearable: boolean
  collapseTags: boolean
  multipleLimit: number
  name: string
  autocomplete: string
  placeholder: string
  filterable: boolean
  allowCreate: boolean
  filterMethod: Fn
  remote: boolean
  remoteMethod: Fn
  loading: boolean
  loadingText: string
  noMatchText: string
  noDataText: string
  popperClass: string
  reserveKeyword: boolean
  defaultFirstOption: boolean
  popperAppendToBody: boolean
  automaticDropdown: boolean
  clearIcon: string
}

/**
 * @description extend from `ElSelect` props
 */
export interface WSelectProps
  extends Partial<ElSelectProps>,
    Partial<MultiTypeCompSharedPropType> {}
