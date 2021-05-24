import type { SharedEvents, MultiTypeCompSharedPropType } from '../../../types'

/**
 * @link https://element-plus.gitee.io/#/zh-CN/component/select#select-attributes
 */
export interface ElSelectProps {
  modelValue: BaseDataType | BaseDataType[] | Recordable[]
  disabled: boolean
  valueKey: string
  size: ComponentSize
  clearable: boolean
  collapseTags: boolean
  multiple: boolean
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
 * @link https://element-plus.gitee.io/#/zh-CN/component/select#select-events
 */
export interface ElSelectEvents extends SharedEvents {
  onVisibleChange?: (visible: boolean) => void

  onRemoveTag?: (tag: BaseDataType) => void
}

/**
 * @description extend from `ElSelect` props
 */
export interface WSelectProps
  extends Partial<ElSelectProps>,
    MultiTypeCompSharedPropType,
    ElSelectEvents {
  /**
   * @description block mode
   */
  block?: boolean
}
