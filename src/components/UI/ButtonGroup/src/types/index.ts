import type { WButtonProps } from '/@/components/UI/Button'
import type { SharedFormComponentEvent } from '/@/components/UI/Form'

export type WButtonGroup = (WButtonProps &
  Partial<Pick<SharedFormComponentEvent, 'onClick'>>)[]
export interface WButtonGroupProps {
  groups: WButtonGroup
}
