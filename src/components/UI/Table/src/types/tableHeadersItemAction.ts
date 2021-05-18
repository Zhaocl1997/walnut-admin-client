import type { WButtonGroupItem } from '../../../ButtonGroup'

/**
 * @description Action column render way
 */
export type WTableHeaderItemExtendActionType = 'array' | 'slot'

/**
 * @description Action column array button group config
 */
export type WTableHeaderItemExtendActionConfig = 'create' | 'edit' | 'delete'

/**
 * @description Action column custom array to render button group
 */
export type WTableHeaderItemExtendActionButtonGroup = WButtonGroupItem & {
  actionButtonType?: WTableHeaderItemExtendActionConfig
}

/**
 * @description Action column config props
 */
export type WTableHeaderItemExtendActionProps = {
  actionType: WTableHeaderItemExtendActionType
  actionConfig: WTableHeaderItemExtendActionConfig[]
  actionButtonGroup: WTableHeaderItemExtendActionButtonGroup[]
}
