import type { SelectProps, TooltipProps } from 'naive-ui'

import { WithValue } from '@/components/HOC/WithValue'
import RawWSelect from './index.vue'

export default WithValue<ICompUISelectProps>(RawWSelect)

// TODO 000
export interface ICompUISelectProps extends /* @vue-ignore */ SelectProps {
  tooltip?: boolean
  tooltipThreshold?: number
  tooltipProps?: TooltipProps
}
