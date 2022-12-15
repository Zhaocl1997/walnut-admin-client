import type { props } from './props'

type ExtendProps = Partial<ExtractPropTypes<typeof props>>

export type WInputProps = ExtendProps
