import { zhCN, dateZhCN } from 'naive-ui'

const appLocale = useAppStoreLocale()

export const getLocale = computed(() =>
  appLocale.locale === AppConstLocale.EN_US ? {} : zhCN
)
export const getDateLocale = computed(() =>
  appLocale.locale === AppConstLocale.EN_US ? {} : dateZhCN
)
