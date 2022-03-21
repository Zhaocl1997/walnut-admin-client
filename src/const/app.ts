export const DevideConst = {
  MOBILE: 'mobile',
  TABLET: 'tablet',
  LAPTOP: 'laptop',
  DESKTOP: 'desktop',
} as const

export type ValueOfDevideConst = typeof DevideConst[keyof typeof DevideConst]

export const DarkModeConst = {
  LIGHT: 'light',
  DARK: 'dark',
  SYSTEM: 'system',
} as const

export type ValueOfDarkModeConst =
  typeof DarkModeConst[keyof typeof DarkModeConst]

export const LocaleConst = {
  EN_US: 'en_US',
  ZH_CN: 'zh_CN',
} as const

export type ValueOfLocaleConst = typeof LocaleConst[keyof typeof LocaleConst]

export const MenuCollapseModeConst = {
  ICON: 'icon',
  BAR: 'bar',
  ARROW_CIRCLE: 'arrow-circle',
  BUTTON: 'button',
} as const
export type ValueOfMenuCollapseModeConst =
  typeof MenuCollapseModeConst[keyof typeof MenuCollapseModeConst]

export const TabStyleModeConst = {
  ROUND: 'round',
  FLEX: 'flex',
  CARD: 'card',
} as const

export type ValueOfTabStyleModeConst =
  typeof TabStyleModeConst[keyof typeof TabStyleModeConst]

export const AppLayoutModeConst = {
  LEFT_MENU: 'left-menu',
  TOP_MENU: 'top-menu',
} as const

export type ValueOfAppLayoutModeConst =
  typeof AppLayoutModeConst[keyof typeof AppLayoutModeConst]

export const AppLockModeConst = {
  MANUAL: 'manual',
  AUTO: 'auto',
} as const

export type ValueOfAppLockModeConst =
  typeof AppLockModeConst[keyof typeof AppLockModeConst]
