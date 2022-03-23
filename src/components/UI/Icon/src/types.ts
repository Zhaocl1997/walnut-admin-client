import { props } from './props'

type ExtendProps = Partial<ExtractPropTypes<typeof props>>

export type WIconProps = ExtendProps
