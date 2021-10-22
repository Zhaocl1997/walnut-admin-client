export const MenuTypeConst = {
  CATALOG: 'catalog',
  MENU: 'menu',
  ELEMENT: 'element',
} as const

export const MenuTernalConst = {
  EXTERNAL: 'external',
  INTERNAL: 'internal',
  NONE: 'none',
} as const

export type ValueOfMenuTypeConst = ValueOf<typeof MenuTypeConst>
export type ValueOfMenuTernalConst = ValueOf<typeof MenuTernalConst>
