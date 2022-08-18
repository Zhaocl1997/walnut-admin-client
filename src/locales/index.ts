import type { I18nOptions } from 'vue-i18n'

import { createI18n } from 'vue-i18n'

/**
 * @description Get locale messages from back end
 */
const createI18nOptions = async (): Promise<I18nOptions> => {
  const appLocale = useAppStoreLocale()

  const locale = appLocale.locale

  const backendMsg = await AppI18nGetI18nMsg(locale)

  return {
    // you must set `false`, to use Compostion API
    legacy: false,

    // vue-i18n@9.2-beta.32, need to set this true
    // https://vue-i18n.intlify.dev/guide/migration/vue3.html#how-to-migration
    allowComposition: true,

    locale,

    // missingWarn: false,

    messages: {
      [locale]: backendMsg.data,
    },
  }
}

export let AppI18n: ReturnType<typeof createI18n>

export const setupI18n = async (app: App) => {
  const options = await createI18nOptions()
  AppI18n = createI18n(options)
  app.use(AppI18n)
  AppInfo('Locale Initializing...')
}

export const useAppI18n = () => useI18n()
