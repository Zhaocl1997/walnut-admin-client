/**
 * @link https://vue-i18n-next.intlify.dev/guide/advanced/lazy.html
 */
export function useAppLocale() {
  const appLocale = useAppStoreLocale()

  const loadLocaleMessages = async (locale: ValueOfAppConstLocale) => {
    // Don't load again if has been loaded
    if (
      Object.keys(
        (AppI18n.global?.messages as unknown as Ref<string[]>).value,
      ).includes(locale)
    ) {
      return
    }

    const backendMsg = await AppI18nGetI18nMsg(locale)

    AppI18n.global.setLocaleMessage(locale, backendMsg)

    return nextTick()
  }

  const setI18nLanguage = (locale: ValueOfAppConstLocale) => {
    AppI18n.global.locale.value = locale

    /**
     * NOTE:
     * If you need to specify the language setting for headers, such as the `fetch` API, set it here.
     * The following is an example for axios.
     *
     * axios.defaults.headers.common['Accept-Language'] = locale
     */
    document.querySelector('html')?.setAttribute('lang', locale)
  }

  watchEffect(async () => {
    await loadLocaleMessages(appLocale.locale)
    setI18nLanguage(appLocale.locale)
  })
}
