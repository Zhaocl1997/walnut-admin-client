import type { props } from './props'

type ExtendProps = Partial<ExtractPropTypes<typeof props>>

export type WColorPickerProps = ExtendProps
