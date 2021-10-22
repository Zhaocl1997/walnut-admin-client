import type { InputNumberProps } from 'naive-ui'

import { props } from './props'

type ExtendProps = Partial<ExtractPropTypes<typeof props>>

export interface WInputNumberProps extends InputNumberProps, ExtendProps {}
