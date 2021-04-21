/**
 * @link https://element-plus.gitee.io/#/zh-CN/component/pagination#attributes
 */
export interface ElPaginationProps {
  small: boolean
  background: boolean
  pageSize: number
  total: number
  pageCount: number
  pagerCount: number
  currentPage: number
  layout: string
  pageSizes: number[]
  popperClass: string
  prevText: string
  nextText: string
  disabled: boolean
  hideOnSinglePage: boolean
}

/**
 * @description extend from `ElPaginationProps` props
 */
export interface WPaginationProps extends Partial<ElPaginationProps> {
  autoScroll?: boolean
}
