import type { WButtonProps } from '../../../Button'
import type { WFormSchemaItemEvent } from '../../../Form'

export interface WButtonGroupProps {
  groups: WButtonProps & Partial<WFormSchemaItemEvent>[]
}
