import type { DatePickerProps } from 'naive-ui'

import { props } from './props'

type ExtendProps = Partial<ExtractPropTypes<typeof props>>

export interface WDatePickerProps extends DatePickerProps, ExtendProps {}
