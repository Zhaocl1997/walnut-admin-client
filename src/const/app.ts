export const DevideConst = {
  MOBILE: 'mobile',
  TABLET: 'tablet',
  LAPTOP: 'laptop',
  DESKTOP: 'desktop',
} as const

export type ValueOfDevideConst = ValueOf<typeof DevideConst>

export const DarkModeConst = {
  LIGHT: 'light',
  DARK: 'dark',
  SYSTEM: 'system',
} as const

export type ValueOfDarkModeConst = ValueOf<typeof DarkModeConst>

export const LocaleConst = {
  EN_US: 'en-US',
  ZH_CN: 'zh-CN',
} as const

export type ValueOfLocaleConst = ValueOf<typeof LocaleConst>

export const MenuCollapseModeConst = {
  ICON: 'icon',
  BAR: 'bar',
  ARROW_CIRCLE: 'arrow-circle',
  BUTTON: 'button',
} as const
export type ValueOfMenuCollapseModeConst = ValueOf<typeof MenuCollapseModeConst>

export const TabStyleModeConst = {
  ROUND: 'round',
  FLEX: 'flex',
  CARD: 'card',
} as const

export type ValueOfTabStyleModeConst = ValueOf<typeof TabStyleModeConst>

export const AppLayoutModeConst = {
  LEFT_MENU: 'left-menu',
  TOP_MENU: 'top-menu',
} as const

export type ValueOfAppLayoutModeConst = ValueOf<typeof AppLayoutModeConst>

export const AppLockModeConst = {
  MANUAL: 'manual',
  AUTO: 'auto',
} as const

export type ValueOfAppLockModeConst = ValueOf<typeof AppLockModeConst>
