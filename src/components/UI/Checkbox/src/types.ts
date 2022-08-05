import type { CheckboxGroupProps } from 'naive-ui'
import type { WithValueProp } from '@/components/HOC/WithValue'

import { props } from './props'

type ExtendProps = Partial<ExtractPropTypes<typeof props>>

export interface WCheckboxProps
  extends CheckboxGroupProps,
    ExtendProps,
    Omit<WithValueProp, 'value'> {}
