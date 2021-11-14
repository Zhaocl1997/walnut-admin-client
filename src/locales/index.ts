import type { I18nOptions } from 'vue-i18n'

import { createI18n } from 'vue-i18n'

import { langLists, fallbackLocale, availableLocales } from './utils'

/**
 * @description Get locale from store. Lazy load locale messages
 */
const createI18nOptions = async (): Promise<I18nOptions> => {
  const { app } = useAppState()

  const locale = app.value.locale

  const messages = await import(`./lang/${locale}.ts`)

  return {
    // you must set `false`, to use Compostion API
    legacy: false,

    locale,

    fallbackLocale,

    messages: {
      [locale]: messages.default,
    },

    availableLocales,
  }
}

export let AppI18n: ReturnType<typeof createI18n>

export const setupI18n = async (app: App) => {
  const options = await createI18nOptions()
  AppI18n = createI18n(options)
  app.use(AppI18n)
}

export { langLists }

export const useAppI18n = () => {
  const t = (l: string, args?: any) => {
    if (l) return AppI18n.global.t(l, args)
    return l
  }
  return {
    ...useI18n(),
    t,
  }
}
