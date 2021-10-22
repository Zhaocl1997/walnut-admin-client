import type { RadioGroupProps } from 'naive-ui'

import { props } from './props'

type ExtendProps = Partial<ExtractPropTypes<typeof props>>

export interface WRadioProps extends RadioGroupProps, ExtendProps {}
