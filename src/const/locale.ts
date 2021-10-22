export const LocaleConst = {
  EN: 'en',
  ZH_CN: 'zh_CN',
} as const

export type ValueOfLocaleConst = ValueOf<typeof LocaleConst>
