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
  EN: 'en',
  ZH_CN: 'zh_CN',
} as const

export type ValueOfLocaleConst = ValueOf<typeof LocaleConst>
