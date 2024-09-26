/**
 * @description get language lists from back end, used for language change
 * This should only called once in AppLocalePicker component
 */
export async function AppI18nGetLangLists() {
  const lists = await AppAxios.get<
    Pick<AppSystemLang, 'lang' | 'description' | 'order'>[]
  >({
    url: '/system/lang/list/public',
  })

  return lists.map(i => ({
    value: i.lang!,
    label: i.description!,
  }))
}

/**
 * @description get locale messages from back end by language
 * Called 1: app i18n init
 * Called 2: change language, need to request for new messages by new language
 */
export async function AppI18nGetI18nMsg(lang: string, cache = 1) {
  const messages = await AppAxios.get<Recordable>({
    url: `/system/locale/message/${lang}`,
    params: {
      cache,
    },
  })

  AppConsoleInfo('I18n', messages)

  return messages
}
