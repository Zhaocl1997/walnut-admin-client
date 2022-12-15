import type { SelectProps } from 'naive-ui'
import type { props } from './props'
import type { WithValueProp } from '@/components/HOC/WithValue'

type ExtendProps = Partial<ExtractPropTypes<typeof props>>

export interface WSelectProps
  extends SelectProps,
  ExtendProps,
  Omit<WithValueProp, 'value' | 'multiple'> {}
