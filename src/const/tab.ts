export const DeleteTabConst = {
  TAB_SELF: 'TAB_SELF',
  TAB_LEFT: 'TAB_LEFT',
  TAB_RIGHT: 'TAB_RIGHT',
  TAB_OTHER: 'TAB_OTHER',
  TAB_ALL: 'TAB_ALL',
} as const

export type ValueOfDeleteTabConst = ValueOf<typeof DeleteTabConst>
