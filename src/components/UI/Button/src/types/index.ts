import type { onClick } from '../../../types'
import type { MaybeRef } from '/~/utils'

/**
 * @link https://element-plus.gitee.io/#/zh-CN/component/button#attributes
 */
export interface ElButtonProps {
  size: ComponentSize
  type: ComponentType
  plain: boolean
  round: boolean
  circle: boolean
  loading: MaybeRef<boolean>
  disabled: boolean
  icon: string
  autofocus: boolean
  nativeType: 'button' | 'submit' | 'reset'
}

/**
 * @description extend from `ElButton` props
 */
export interface WButtonProps extends Partial<ElButtonProps> {
  /**
   * @description suffix icon
   */
  suffixIcon?: string

  /**
   * @description retry delay in second
   */
  retryDelay?: number

  /**
   * @description load delay in second
   */
  loadDelay?: number

  /**
   * @description block mode
   */
  block?: boolean

  /**
   * @description text for prop
   */
  text?: MaybeRef<string>

  /**
   * @description Throttle time to prevent repeat click
   */
  debounce?: number

  /**
   * @description help message on button
   */
  helpMessage?: string

  onClick?: onClick
}
