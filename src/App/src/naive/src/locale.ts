import { zhCN, dateZhCN } from 'naive-ui'

const appLocale = useAppLocaleStore()

export const getLocale = computed(() =>
  appLocale.locale === LocaleConst.EN_US ? {} : zhCN
)
export const getDateLocale = computed(() =>
  appLocale.locale === LocaleConst.EN_US ? {} : dateZhCN
)
