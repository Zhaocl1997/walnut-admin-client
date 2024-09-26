import type { Serializer } from '@vueuse/core'

interface IAppStorageOptions<T> {
  storage?: typeof localStorage | typeof sessionStorage
  expire?: number
  encrypt?: boolean
  usePresetKey?: boolean
  serializer?: Serializer<T>
}

export const getStorageKey = (key: string) => `${storagePrefix}__${key.replaceAll('-', '_').toLocaleUpperCase()}__`

// app storage
// default cache 7 days
// defualt only encrypt in prod
// map/set need to pass `serializer`, and no more expire nor encrypt
export function useAppStorage<T>(key: string, initialValue: MaybeComputedRef<T>, options: IAppStorageOptions<T> = {}) {
  const { storage = localStorage, expire = +import.meta.env.VITE_SECONDS_PERSIST * 1000, encrypt = isProd(), usePresetKey = true, serializer } = options

  const getKey = usePresetKey
    ? getStorageKey(key)
    : key

  return useStorage<T>(getKey, initialValue, storage, {
    serializer: serializer ?? {
      read: (val) => {
        if (!val)
          return null

        const decryptValue = JSON.parse(
          encrypt ? AppPersistEncryption.decrypt(val) : val,
        )

        if (!decryptValue) {
          storage.removeItem(getKey)
          return null
        }

        const { v, e } = decryptValue

        // not expire yet
        // or exipre is Infinity
        if (new Date().getTime() <= e || !e) {
          return v
        }
        else {
          storage.removeItem(getKey)
          return null
        }
      },

      write: (val) => {
        let ex

        const target = storage.getItem(getKey)

        if (target) {
          const d = encrypt ? AppPersistEncryption.decrypt(target) : target
          ex = d.e
        }

        const str = JSON.stringify({
          v: val,
          e: expire === Infinity ? null : ex ?? new Date().getTime() + expire,
        })

        return encrypt ? AppPersistEncryption.encrypt(str)! : str
      },
    },
  })
}
