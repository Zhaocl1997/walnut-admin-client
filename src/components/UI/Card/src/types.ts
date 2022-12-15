import type { CardProps } from 'naive-ui'

import type { props } from './props'

type ExtendProps = Partial<ExtractPropTypes<typeof props>>

export interface WCardProps extends CardProps, ExtendProps {}
