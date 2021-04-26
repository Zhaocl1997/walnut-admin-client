import type { ElSelectProps } from '/@/components/UI/Select'
import type { WTreePropsOptions } from '/@/components/UI/Tree'

export interface WSelectTreeProp<T = any> extends Partial<ElSelectProps> {
  data: T[]

  props: WTreePropsOptions
}
