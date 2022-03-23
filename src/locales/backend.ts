/**
 * @description get language lists from back end, used for language change
 * This should only called once in AppLocalePicker component
 */
export const AppI18nGetLangLists = async () => {
  const lists = await AppAxios.get<
    Pick<AppSystemLang, 'lang' | 'description' | 'order'>[]
  >({
    url: '/system/lang/list/public',
  })

  return lists.map((i) => ({
    value: i.lang!,
    label: i.description!,
  }))
}

/**
 * @description get locale messages from back end by language
 * Called 1: app i18n init
 * Called 2: change language, need to request for new messages by new language
 */
export const AppI18nGetI18nMsg = async (lang: string) => {
  const messages = await AppAxios.get<{ data: Recordable; _id: string }>({
    url: `/system/locale/message/${lang}`,
  })

  AppInfo(messages)

  return messages
}
