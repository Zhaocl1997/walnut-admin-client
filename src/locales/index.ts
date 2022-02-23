import type { I18nOptions } from 'vue-i18n'

import { createI18n } from 'vue-i18n'

import { AppI18nGetI18nMsg } from './backend'

/**
 * @description Get locale messages from back end
 */
const createI18nOptions = async (): Promise<I18nOptions> => {
  const { app } = useAppState()

  const locale = app.value.locale

  const backendMsg = await AppI18nGetI18nMsg(locale)

  return {
    // you must set `false`, to use Compostion API
    legacy: false,

    locale,

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
  AppTerminalLog('Locale Initialized!')
}

export const useAppI18n = () => {
  return {
    ...useI18n(),
    t: (k: string | undefined) => {
      if (k) return useI18n().t(k)
      return ''
    },
  }
}
