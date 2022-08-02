export const AppConstDevice = {
  MOBILE: 'mobile',
  TABLET: 'tablet',
  LAPTOP: 'laptop',
  DESKTOP: 'desktop',
} as const

export type ValueOfAppConstDevice =
  typeof AppConstDevice[keyof typeof AppConstDevice]

export const AppConstDarkMode = {
  LIGHT: 'light',
  DARK: 'dark',
  SYSTEM: 'system',
} as const

export type ValueOfAppConstDarkMode =
  typeof AppConstDarkMode[keyof typeof AppConstDarkMode]

export const AppConstLocale = {
  EN_US: 'en_US',
  ZH_CN: 'zh_CN',
} as const

export type ValueOfAppConstLocale =
  typeof AppConstLocale[keyof typeof AppConstLocale]

export const AppConstCollapseMode = {
  ICON: 'icon',
  BAR: 'bar',
  ARROW_CIRCLE: 'arrow-circle',
  BUTTON: 'button',
} as const
export type ValueOfAppConstCollapseMode =
  typeof AppConstCollapseMode[keyof typeof AppConstCollapseMode]

export const AppConstTabStyleMode = {
  ROUND: 'round',
  FLEX: 'flex',
  CARD: 'card',
} as const

export type ValueOfAppConstTabStyleMode =
  typeof AppConstTabStyleMode[keyof typeof AppConstTabStyleMode]

export const AppConstLayoutMode = {
  LEFT_MENU: 'left-menu',
  TOP_MENU: 'top-menu',
} as const

export type ValueOfAppConstLayoutMode =
  typeof AppConstLayoutMode[keyof typeof AppConstLayoutMode]

export const AppConstLockMode = {
  MANUAL: 'manual',
  AUTO: 'auto',
} as const

export type ValueOfAppConstLockMode =
  typeof AppConstLockMode[keyof typeof AppConstLockMode]
