import type { CardProps } from 'naive-ui'

import { props } from './props'

type ExtendProps = Partial<ExtractPropTypes<typeof props>>

export interface WCardProps extends CardProps, ExtendProps {}
