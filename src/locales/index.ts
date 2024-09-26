import type { I18nOptions } from 'vue-i18n'

import { createI18n } from 'vue-i18n'

/**
 * @description Get locale messages from back end
 */
async function createI18nOptions(): Promise<I18nOptions> {
  const appLocale = useAppStoreLocale()

  const locale = appLocale.locale

  const backendMsg = await AppI18nGetI18nMsg(locale)

  return {
    // you must set `false`, to use Compostion API
    legacy: false,

    locale,

    // missingWarn: false,

    messages: {
      [locale]: backendMsg,
    },
  }
}

// eslint-disable-next-line import/no-mutable-exports
export let AppI18n: ReturnType<typeof createI18n>

export async function setupI18n(app: App) {
  const options = await createI18nOptions()
  AppI18n = createI18n(options)
  app.use(AppI18n)
  AppConsoleInfo('I18n', 'Locale Initializing...')
}

export const useAppI18n = () => useI18n()
