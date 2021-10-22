import type { InputProps } from 'naive-ui'

import { props } from './props'

type ExtendProps = Partial<ExtractPropTypes<typeof props>>

export interface WInputProps extends InputProps, ExtendProps {}
