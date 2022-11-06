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
  EN_US: 'en-US',
  ZH_CN: 'zh-CN',
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

export const AppConstTabCloseMode = {
  ALWAYS: 'always',
  HOVER: 'hover',
} as const

export type ValueOfAppConstTabCloseMode =
  typeof AppConstTabCloseMode[keyof typeof AppConstTabCloseMode]

export const AppConstTabAffixMode = {
  ICON: 'icon',
  PIN: 'pin',
} as const

export type ValueOfAppConstTabAffixMode =
  typeof AppConstTabAffixMode[keyof typeof AppConstTabAffixMode]

export const AppConstLayoutMode = {
  LEFT_MENU: 'left-menu',
  TOP_MENU: 'top-menu',
} as const

export type ValueOfAppConstLayoutMode =
  typeof AppConstLayoutMode[keyof typeof AppConstLayoutMode]

export const AppConstLockMode = {
  DEFAULT: 'default',
  SECURITY: 'security',
  IDLE: 'idle',
} as const

export type ValueOfAppConstLockMode =
  typeof AppConstLockMode[keyof typeof AppConstLockMode]

export const AppConstAnimationMode = {
  GLOBAL: 'global',
  SCOPE: 'scope',
} as const

export type ValueOfAppConstAnimationMode =
  typeof AppConstAnimationMode[keyof typeof AppConstAnimationMode]

export const AppConstColorMode = {
  DEFAULT: 'default',
  CAFE: 'cafe',
  CONTRAST: 'contrast',
  GRAYSCALE: 'grayscale',
  GRAYSCALE_INVERTED: 'grayscale-inverted',
  INVERTED: 'inverted',
} as const

export type ValueOfAppConstColorMode =
  typeof AppConstColorMode[keyof typeof AppConstColorMode]
