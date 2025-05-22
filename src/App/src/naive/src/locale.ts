import type { NDateLocale, NLocale } from 'naive-ui'
import { dateZhCN, zhCN } from 'naive-ui'

const appLocale = useAppStoreLocale()

export const getLocale = computed((): NLocale | undefined =>
  appLocale.locale === AppConstLocale.EN_US ? undefined : zhCN,
)
export const getDateLocale = computed((): NDateLocale | undefined =>
  appLocale.locale === AppConstLocale.EN_US ? undefined : dateZhCN,
)
