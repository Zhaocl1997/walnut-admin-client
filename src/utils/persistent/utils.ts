import {
  getCookiePrefix,
  getLocalStoragePrefix,
  getSessionStoragePrefix,
} from '../constant/prefix'
import { StorageTypeEnum } from '/@/enums/persistent'

export type StorageType =
  | StorageTypeEnum.LOCAL_STORAGE
  | StorageTypeEnum.SESSION_STORAGE
  | StorageTypeEnum.COOKIES

export const getAllKeys = (storage: StorageType): string[] => {
  const ret: string[] = []
  let prefix = ''

  switch (storage) {
    case StorageTypeEnum.LOCAL_STORAGE:
      prefix = getLocalStoragePrefix()

      Object.keys(localStorage).map((key) => {
        const originalKey = key
          .replace(prefix.toLocaleUpperCase(), '')
          .replace(/\__$/, '')
          .replace(/^\__/, '')
        ret.push(originalKey)
      })
      break

    case StorageTypeEnum.SESSION_STORAGE:
      prefix = getSessionStoragePrefix()

      Object.keys(sessionStorage).map((key) => {
        const originalKey = key
          .replace(prefix.toLocaleUpperCase(), '')
          .replace(/\__$/, '')
          .replace(/^\__/, '')
        ret.push(originalKey)
      })
      break

    case StorageTypeEnum.COOKIES:
      prefix = getCookiePrefix()

      const arr = document.cookie.match(/[^ =;]+(?==)/g)

      arr &&
        arr.map((key) => {
          const originalKey = key
            .replace(prefix.toLocaleUpperCase(), '')
            .replace(/\__$/, '')
            .replace(/^\__/, '')
          ret.push(originalKey)
        })
      break

    default:
      break
  }

  return ret
}
