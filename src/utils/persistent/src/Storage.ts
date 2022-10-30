import { storagePrefix } from '../../constant/prefix'
import { isProd } from '../../constant/vue'

const { persist } = useAppEnv('seconds')

// app storage
// default cache 7 days
// defualt only encrypt in prod
export const useAppStorage = <T>(
  key: string,
  initialValue: MaybeComputedRef<T>,
  expire: number = +persist! * 1000,
  storage = localStorage
) => {
  const wholeKey = `${storagePrefix}__${key
    .replaceAll('-', '_')
    .toLocaleUpperCase()}__`
  const encrypt = isProd()

  return useStorage<T>(wholeKey, initialValue, storage, {
    serializer: {
      read: (val) => {
        if (!val) return null

        const decryptValue = JSON.parse(
          encrypt ? AppPersistEncryption.decrypt(val) : val
        )

        if (!decryptValue) {
          storage.removeItem(wholeKey)
          return null
        }

        const { v, e } = decryptValue

        // not expire yet
        // or exipre is Infinity
        if (new Date().getTime() <= e || !e) {
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
          const d = encrypt ? AppPersistEncryption.decrypt(target) : target
          ex = d.e
        }

        const str = JSON.stringify({
          v,
          e: ex ?? new Date().getTime() + expire,
        })

        return encrypt ? AppPersistEncryption.encrypt(str)! : str
      },
    },
  })
}
