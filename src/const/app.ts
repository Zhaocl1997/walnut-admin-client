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
}
export type ValueOfMenuCollapseModeConst = ValueOf<typeof MenuCollapseModeConst>

export const TabStyleModeConst = {
  ROUND: 'round',
  FLEX: 'flex',
  CARD: 'card',
}

export type ValueOfTabStyleModeConst = ValueOf<typeof TabStyleModeConst>
