import type { DynamicTagsProps } from 'naive-ui'

import type { props } from './props'

type ExtendProps = Partial<ExtractPropTypes<typeof props>>

export interface WDynamicTagsProps extends DynamicTagsProps, ExtendProps {}
