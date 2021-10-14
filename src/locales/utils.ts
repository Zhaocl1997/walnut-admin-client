import { easyDeepSet } from 'easy-fns-ts'

import { LocaleEnum } from '/@/enums/locale'

/**
 * @description Get locale messages include ElementPlus locale
 */
const getModuleMessages = (module: Recordable) => {
  const ret: any = {}

  Object.keys(module).forEach((key) => {
    const section = module[key].default

    // get namespace
    const namespace = key.split('/').splice(3).join('.').replace('.ts', '')

    // set namespaced locales on ret
    easyDeepSet(ret, namespace, section)
  })

  return ret
}

/**
 * @description Get current locale messages
 */
export const getLocaleMessages = (locale: string) => {
  let targetModule: Recordable = {}

  switch (locale) {
    case LocaleEnum.EN:
      targetModule = import.meta.globEager('./lang/en/**/*.ts')
      break

    case LocaleEnum.ZH_CN:
      targetModule = import.meta.globEager('./lang/zh_CN/**/*.ts')
      break

    default:
      break
  }

  return getModuleMessages(targetModule)
}

// Locale list
export const langLists = [
  {
    value: LocaleEnum.EN,
    label: 'English',
  },
  {
    value: LocaleEnum.ZH_CN,
    label: '简体中文',
  },
]

// some options
export const fallbackLocale = LocaleEnum.EN
export const availableLocales = [LocaleEnum.EN, LocaleEnum.ZH_CN]

export const t = (key: string) => key

/**
 * @description Dummy way to get real message.
 */
export const getMaybeI18nMsg = (field?: string) => {
  const { t } = useAppI18n()
  return field && field.includes('.') ? t(field!) : field
}
