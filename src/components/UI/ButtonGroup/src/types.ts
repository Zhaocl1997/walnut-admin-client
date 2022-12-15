import type { ButtonGroupProps } from 'naive-ui'

import type { props } from './props'

type ExtendProps = Partial<ExtractPropTypes<typeof props>>

export interface WButtonGroupProps extends ButtonGroupProps, ExtendProps {}
