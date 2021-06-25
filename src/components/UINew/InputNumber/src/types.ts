import type { InputNumberProps } from 'naive-ui'
import type { ExtractPropTypes } from 'vue'

import { props } from './props'

type ExtendProps = Partial<ExtractPropTypes<typeof props>>

export interface WInputNumberProps extends InputNumberProps, ExtendProps {}
