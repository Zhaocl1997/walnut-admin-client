import type { App } from 'vue'
import type { I18nOptions, VueI18n } from 'vue-i18n'

import { createI18n } from 'vue-i18n'

import { useAppContext } from '/@/App'
import { langLists, fallbackLocale, availableLocales } from './utils'

/**
 * @description Get locale from store. Lazy load locale messages
 */
const createI18nOptions = async (): Promise<I18nOptions> => {
  const appContext = useAppContext<false>()

  const locale = appContext.app.locale

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

export const useI18n = (): VueI18n => {
  const normalFn = {
    t: (key: string) => {
      return key
    },
  }

  // avoid undefined error
  if (!AppI18n) {
    return normalFn as VueI18n
  }

  const { t, locale } = AppI18n.global

  const tFn = (key: string) => {
    if (!key) return ''
    if (!key.includes('.')) return key
    return t(key)
  }

  return {
    locale,
    t: tFn,
  } as VueI18n
}
