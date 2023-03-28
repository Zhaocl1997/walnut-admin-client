import qs from 'qs'
import type { LocationQueryRaw } from 'vue-router'

export const stringifyQuery = (obj: LocationQueryRaw) => {
  const appSetting = useAppStoreSetting()

  if (!obj || Object.keys(obj).length === 0)
    return ''

  const str = qs.stringify(obj)

  if (appSetting.app.routeQueryMode === 'enhanced') {
    if (appSetting.app.routeQueryEnhancedMode === 'base64')
      return wbtoa(str)

    if (appSetting.app.routeQueryEnhancedMode === 'cryptojs')
      return AppPersistEncryption.encrypt(str)!
  }

  return str
}

export const parseQuery = (query: string) => {
  const appSetting = useAppStoreSetting()

  if (appSetting.app.routeQueryMode === 'enhanced') {
    if (appSetting.app.routeQueryEnhancedMode === 'base64')
      return qs.parse(watob(query))

    if (appSetting.app.routeQueryEnhancedMode === 'cryptojs')
      return qs.parse(AppPersistEncryption.decrypt(query))
  }

  return qs.parse(query) as any
}
