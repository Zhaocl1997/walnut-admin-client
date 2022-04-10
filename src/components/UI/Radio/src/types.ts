import type { RadioGroupProps } from 'naive-ui'
import type { WithValueProp } from '/@/components/HOC/WithValue'

import { props } from './props'

type ExtendProps = Partial<ExtractPropTypes<typeof props>>

export interface WRadioProps
  extends RadioGroupProps,
    ExtendProps,
    Omit<WithValueProp, 'value' | 'multiple'> {}
