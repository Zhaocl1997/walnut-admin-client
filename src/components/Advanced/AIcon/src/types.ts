import type { WIconProps } from '/@/components/UI/Icon'

import { props } from './props'

type ExtendProps = Partial<ExtractPropTypes<typeof props>>

export interface WAIconProps extends WIconProps, ExtendProps {}
