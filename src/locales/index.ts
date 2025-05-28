import type { I18n, I18nOptions, Locale } from 'vue-i18n'

import { createI18n } from 'vue-i18n'

/**
 * @description Get locale messages from back end
 */
async function createI18nOptions(): Promise<I18nOptions> {
  const appLocale = useAppStoreLocale()

  const locale = appLocale.locale

  const backendMsg = await AppI18nGetI18nMsg(locale)

  return {
    legacy: false,

    locale,

    messages: {
      [locale]: backendMsg,
    },
  }
}

// eslint-disable-next-line import/no-mutable-exports
export let AppI18n: I18n<Record<string, unknown>, Record<string, unknown>, Record<string, unknown>, Locale, false>

export async function setupI18n(app: App) {
  const options = await createI18nOptions()
  AppI18n = createI18n<false>(options)
  app.use(AppI18n)
  console.info('I18n', 'Locale Initializing...')
}

export const useAppI18n = () => useI18n()
