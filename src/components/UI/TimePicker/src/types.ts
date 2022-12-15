import type { TimePickerProps } from 'naive-ui'

import type { props } from './props'

type ExtendProps = Partial<ExtractPropTypes<typeof props>>

export interface WTimePickerProps extends TimePickerProps, ExtendProps {}
