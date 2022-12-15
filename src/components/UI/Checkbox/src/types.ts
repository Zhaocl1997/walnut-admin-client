import type { CheckboxGroupProps } from 'naive-ui'
import type { props } from './props'
import type { WithValueProp } from '@/components/HOC/WithValue'

type ExtendProps = Partial<ExtractPropTypes<typeof props>>

export interface WCheckboxProps
  extends CheckboxGroupProps,
  ExtendProps,
  Omit<WithValueProp, 'value'> {}
