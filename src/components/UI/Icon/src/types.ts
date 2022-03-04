import type { IconProps } from '@iconify/vue'

import { props } from './props'

type ExtendProps = Partial<ExtractPropTypes<typeof props>>

export interface WIconProps extends IconProps, ExtendProps {}
