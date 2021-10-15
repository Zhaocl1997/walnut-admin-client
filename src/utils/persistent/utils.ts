import { storagePrefix } from '../constant/prefix'
import { StorageTypeEnum } from '/@/enums/persistent'

export type StorageType = 'localStorage' | 'sessionStorage' | 'cookies'

export const getAllKeys = (storage: StorageType): string[] => {
  const ret: string[] = []
  const prefix = storagePrefix

  switch (storage) {
    case StorageTypeEnum.LOCAL_STORAGE:
      Object.keys(localStorage).map((key) => {
        const originalKey = key
          .replace(prefix.toLocaleUpperCase(), '')
          .replace(/\__$/, '')
          .replace(/^\__/, '')
        ret.push(originalKey)
      })
      break

    case StorageTypeEnum.SESSION_STORAGE:
      Object.keys(sessionStorage).map((key) => {
        const originalKey = key
          .replace(prefix.toLocaleUpperCase(), '')
          .replace(/\__$/, '')
          .replace(/^\__/, '')
        ret.push(originalKey)
      })
      break

    case StorageTypeEnum.COOKIES:
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
