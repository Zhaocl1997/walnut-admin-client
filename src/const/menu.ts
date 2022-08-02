export const AppConstMenuType = {
  CATALOG: 'catalog',
  MENU: 'menu',
  ELEMENT: 'element',
} as const

export const AppConstMenuTernal = {
  EXTERNAL: 'external',
  INTERNAL: 'internal',
  NONE: 'none',
} as const

export type ValueOfAppConstMenuType = ValueOf<typeof AppConstMenuType>
export type ValueOfAppConstMenuTernal = ValueOf<typeof AppConstMenuTernal>
