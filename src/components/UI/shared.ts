export function isBaseI18nKey(key: string) {
  return i18nService.baseI18nKeyList?.some(i => i.endsWith(key))
}

// when HMR, get locale messages from API again
if (import.meta.hot) {
  i18nService.createI18nOptions()
}
