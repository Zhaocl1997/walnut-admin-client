import type { WButtonProps } from '/@/components/UI/Button'
import type { SharedFormComponentEvent } from '/@/components/UI/Form'

export type WButtonGroupItem = WButtonProps &
  Partial<Pick<SharedFormComponentEvent, 'onClick'>>
export interface WButtonGroupProps {
  groups: WButtonGroupItem[]
}
