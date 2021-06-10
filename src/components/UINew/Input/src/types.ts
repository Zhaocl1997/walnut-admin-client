import type { InputProps } from 'naive-ui'
import type { ExtractPropTypes } from 'vue'

import { props } from './props'

type ExtendButtonProps = Partial<ExtractPropTypes<typeof props>>

export interface WInputProps extends InputProps, ExtendButtonProps {}
