import type { TimePickerProps } from 'naive-ui'
import type { ExtractPropTypes } from 'vue'

import { props } from './props'

type ExtendProps = Partial<ExtractPropTypes<typeof props>>

export interface WTimePickerProps extends TimePickerProps, ExtendProps {}
