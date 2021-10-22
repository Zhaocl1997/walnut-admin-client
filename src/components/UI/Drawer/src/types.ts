import type { DrawerProps } from 'naive-ui'

import { props } from './props'

type ExtendProps = Partial<ExtractPropTypes<typeof props>>

export interface WDrawertProps extends DrawerProps, ExtendProps {}
