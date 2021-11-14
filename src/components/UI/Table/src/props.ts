import type { WTable } from './types'

export const props = {
  onAction: Function as PropType<
    ({ type }: { type: WTable.HeaderActionType }) => void
  >,

  actionList: Array as PropType<WTable.HeaderActionType[]>,
}
