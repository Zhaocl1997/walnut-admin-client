import { storagePrefix } from '../../constant/prefix'
import { isProd } from '../../constant/vue'
import { AppEncryption } from '/@/utils/crypto'

// app storage
// default cache 7 days
// defualt only encrypt in prod
export const useAppStorage = <T>(
  key: string,
  initialValue: MaybeRef<T>,
  expire: number = import.meta.env.VITE_APP_CACHE_MAXAGE,
  storage = localStorage
) => {
  const wholeKey = `${storagePrefix}__${key.toLocaleUpperCase()}__`
  const encrypt = isProd()

  return useStorage<T>(wholeKey, initialValue, storage, {
    serializer: {
      read: (val) => {
        if (!val) return null

        const decryptValue = JSON.parse(
          encrypt ? AppEncryption.decrypt(val) : val
        )

        if (!decryptValue) {
          storage.removeItem(wholeKey)
          return null
        }

        const { v, e } = decryptValue

        // not expire yet
        if (new Date().getTime() <= e) {
          return v
        } else {
          storage.removeItem(wholeKey)
          return null
        }
      },

      write: (v) => {
        let ex

        const target = storage.getItem(wholeKey)

        if (target) {
          ex = JSON.parse(target).e
        }

        const str = JSON.stringify({
          v,
          e: ex ?? new Date().getTime() + expire * 1000,
        })

        return encrypt ? AppEncryption.encrypt(str)! : str
      },
    },
  })
}
