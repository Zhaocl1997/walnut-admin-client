export const DarkModeConst = {
  LIGHT: 'light',
  DARK: 'dark',
  SYSTEM: 'system',
} as const

export type ValueOfDarkModeConst = ValueOf<typeof DarkModeConst>
