import type { WSelectProps } from '/@/components/UI/Select'
import type { WTreeProps } from '/@/components/UI/Tree'

/**
 * @description extend from select and tree props
 */
export interface WSelectTreeProp<T = unknown>
  extends Pick<
      WSelectProps,
      | 'size'
      | 'multiple'
      | 'disabled'
      | 'clearable'
      | 'collapseTags'
      | 'placeholder'
    >,
    Pick<
      WTreeProps<T>,
      | 'data'
      | 'accordion'
      | 'modelValue'
      | 'props'
      | 'leafOnly'
      | 'includeHalfChecked'
    > {}
