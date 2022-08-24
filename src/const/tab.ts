export const AppConstTabDeleteType = {
  TAB_SINGLE: 'TAB_SINGLE',
  TAB_LEFT: 'TAB_LEFT',
  TAB_RIGHT: 'TAB_RIGHT',
  TAB_OTHER: 'TAB_OTHER',
  TAB_ALL: 'TAB_ALL',
} as const

export type ValueOfAppConstTabDeleteType =
  typeof AppConstTabDeleteType[keyof typeof AppConstTabDeleteType]

export const AppConstTabUtilsShowMode = {
  ALWAYS: 'always',
  OVERFLOW: 'overflow',
} as const

export type ValueOfAppConstTabUtilsShowMode =
  typeof AppConstTabUtilsShowMode[keyof typeof AppConstTabUtilsShowMode]
