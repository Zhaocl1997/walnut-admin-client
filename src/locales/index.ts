import type { App } from 'vue'
import type { I18nOptions } from 'vue-i18n'

import { createI18n, useI18n as VueUseI18n } from 'vue-i18n'

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

type I18nGlobalTranslation = {
  (key: string): string
  (key: string, locale: string): string
  (key: string, locale: string, list: unknown[]): string
  (key: string, locale: string, named: Record<string, unknown>): string
  (key: string, list: unknown[]): string
  (key: string, named: Record<string, unknown>): string
}

export const useI18n = (): {
  t: I18nGlobalTranslation
} => {
  const normalFn = {
    t: (key: string) => {
      return key
    },
  }

  if (!AppI18n) {
    return normalFn
  }

  const { t, ...others } = AppI18n.global

  const tFn = (key: string) => {
    if (!key) return ''
    if (!key.includes('.')) return key
    return t(key)
  }
  return {
    ...others,
    t: tFn,
  }
}
