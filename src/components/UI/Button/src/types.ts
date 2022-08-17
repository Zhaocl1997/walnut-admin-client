import type { ButtonProps } from 'naive-ui'

import { props } from './props'

type ExtendProps = Partial<ExtractPropTypes<typeof props>>

export interface WButtonProps extends ButtonProps, ExtendProps {}

export interface WButtonInst {
  onStartCountdown: Fn
}
