import type { RadioGroupProps } from 'naive-ui'
import type { props } from './props'
import type { WithValueProp } from '@/components/HOC/WithValue'

type ExtendProps = Partial<ExtractPropTypes<typeof props>>

export interface WRadioProps
  extends RadioGroupProps,
  ExtendProps,
  Omit<WithValueProp, 'value' | 'multiple'> {}
