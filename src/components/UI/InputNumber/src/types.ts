import type { InputNumberProps } from 'naive-ui'

import type { props } from './props'

type ExtendProps = Partial<ExtractPropTypes<typeof props>>

export interface WInputNumberProps extends InputNumberProps, ExtendProps {}
