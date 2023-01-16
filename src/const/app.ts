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

export const AppConstBasicMode = {
  GLOBAL: 'global',
  SCOPE: 'scope',
} as const

export type ValueOfAppConstBasicMode =
  typeof AppConstBasicMode[keyof typeof AppConstBasicMode]

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

export const AppConstRouteQueryMode = {
  NORMAL: 'normal',
  ENHANCED: 'enhanced',
} as const

export type ValueOfAppConstRouteQueryMode =
  typeof AppConstRouteQueryMode[keyof typeof AppConstRouteQueryMode]

export const AppConstRouteQueryEnhancedMode = {
  BASE64: 'base64',
  CRYPTOJS: 'cryptojs',
} as const

export type ValueOfAppConstRouteQueryEnhancedMode =
  typeof AppConstRouteQueryEnhancedMode[keyof typeof AppConstRouteQueryEnhancedMode]

export const AppConstRoles = {
  ADMIN: 'admin',
  USER: 'user',
} as const

export type ValueOfAppConstRoles =
  typeof AppConstRoles[keyof typeof AppConstRoles]
