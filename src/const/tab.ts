export const AppConstTabDeleteType = {
  TAB_SINGLE: 'TAB_SINGLE',
  TAB_LEFT: 'TAB_LEFT',
  TAB_RIGHT: 'TAB_RIGHT',
  TAB_OTHER: 'TAB_OTHER',
  TAB_ALL: 'TAB_ALL',
} as const

export type ValueOfAppConstTabDeleteType = ValueOf<typeof AppConstTabDeleteType>
