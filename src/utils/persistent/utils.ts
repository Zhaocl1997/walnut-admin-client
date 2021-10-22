import { storagePrefix } from '../constant/prefix'

export const getAllKeys = (storage: ValueOfStorageTypeConst): string[] => {
  const ret: string[] = []
  const prefix = storagePrefix

  switch (storage) {
    case StorageTypeConst.LOCAL_STORAGE:
      Object.keys(localStorage).map((key) => {
        const originalKey = key
          .replace(prefix.toLocaleUpperCase(), '')
          .replace(/\__$/, '')
          .replace(/^\__/, '')
        ret.push(originalKey)
      })
      break

    case StorageTypeConst.SESSION_STORAGE:
      Object.keys(sessionStorage).map((key) => {
        const originalKey = key
          .replace(prefix.toLocaleUpperCase(), '')
          .replace(/\__$/, '')
          .replace(/^\__/, '')
        ret.push(originalKey)
      })
      break

    case StorageTypeConst.COOKIES:
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
