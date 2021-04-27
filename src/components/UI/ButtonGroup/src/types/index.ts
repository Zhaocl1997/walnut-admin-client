import type { WButtonProps } from '/@/components/UI/Button'
import type { SharedFormComponentEvent } from '/@/components/UI/Form'

export interface WButtonGroupProps {
  groups: (WButtonProps & Partial<SharedFormComponentEvent>)[]
}
