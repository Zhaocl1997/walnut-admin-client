import type { DatePickerProps } from 'naive-ui'

import type { props } from './props'

type ExtendProps = Partial<ExtractPropTypes<typeof props>>

export interface WDatePickerProps extends DatePickerProps, ExtendProps {}
