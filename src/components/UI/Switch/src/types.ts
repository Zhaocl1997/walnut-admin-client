import type { SwitchProps } from 'naive-ui'

import { props } from './props'

type ExtendProps = Partial<ExtractPropTypes<typeof props>>

export interface WSwitchProps extends SwitchProps, ExtendProps {}
