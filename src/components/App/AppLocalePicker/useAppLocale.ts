import { AppI18nGetI18nMsg } from '/@/locales/backend'

/**
 * @link https://vue-i18n-next.intlify.dev/guide/advanced/lazy.html
 */
export const useLocale = (locale: ValueOfLocaleConst) => {
  const setI18nLanguage = () => {
    if (AppI18n.mode === 'legacy') {
      AppI18n.global.locale = locale
    } else {
      ;(AppI18n.global.locale as unknown as Ref<string>).value = locale
    }

    /**
     * NOTE:
     * If you need to specify the language setting for headers, such as the `fetch` API, set it here.
     * The following is an example for axios.
     *
     * axios.defaults.headers.common['Accept-Language'] = locale
     */
    document.querySelector('html')?.setAttribute('lang', locale)
  }

  const loadLocaleMessages = async () => {
    // Don't load again if has been loaded
    if (
      Object.keys(
        (AppI18n.global.messages as unknown as Ref<string[]>).value
      ).includes(locale)
    ) {
      return
    }

    const backendMsg = await AppI18nGetI18nMsg(locale)

    AppI18n.global.setLocaleMessage(locale, backendMsg.data)

    return nextTick()
  }

  return {
    loadLocaleMessages,
    setI18nLanguage,
  }
}
