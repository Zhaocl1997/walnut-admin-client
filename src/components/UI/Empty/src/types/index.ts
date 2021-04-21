/**
 * @link https://element-plus.gitee.io/#/zh-CN/component/empty#empty-attributes
 */
export interface ElEmptyProps {
  image: string
  imageSize: number
  description: string
}

/**
 * @description extend from `ElEmptyProps` props
 */
export interface WEmptyProps extends Partial<ElEmptyProps> {
  total?: number
}
