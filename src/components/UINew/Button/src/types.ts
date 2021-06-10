import type { ButtonProps } from 'naive-ui'
import type { ExtractPropTypes } from 'vue'

import { props } from './props'

type ExtendButtonProps = Partial<ExtractPropTypes<typeof props>>

export interface WButtonProps extends ButtonProps, ExtendButtonProps {}
