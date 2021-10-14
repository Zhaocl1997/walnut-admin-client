import type { SelectProps } from 'naive-ui'
import type { ExtractPropTypes } from 'vue'
import type { WithValueProp } from '/@/components/HOC/WithValue'

import { props } from './props'

type ExtendProps = Partial<ExtractPropTypes<typeof props>>

export interface WSelectProps extends SelectProps, ExtendProps, WithValueProp {}
