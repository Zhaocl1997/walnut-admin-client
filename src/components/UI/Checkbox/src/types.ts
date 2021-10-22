import type { CheckboxGroupProps } from 'naive-ui'

import { props } from './props'

type ExtendProps = Partial<ExtractPropTypes<typeof props>>

export interface WCheckboxProps extends CheckboxGroupProps, ExtendProps {}
