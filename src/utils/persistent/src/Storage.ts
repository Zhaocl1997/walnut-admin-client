interface AppStorageOptions {
  storage?: typeof localStorage | typeof sessionStorage
  expire?: number
  encrypt?: boolean
  usePresetKey?: boolean
}

// app storage
// default cache 7 days
// defualt only encrypt in prod
export function useAppStorage<T>(key: string, initialValue: MaybeComputedRef<T>, options: AppStorageOptions = {}) {
  const { storage = localStorage, expire = +import.meta.env.VITE_SECONDS_PERSIST * 1000, encrypt = isProd(), usePresetKey = true } = options

  const getKey = usePresetKey
    ? `${storagePrefix}__${key
    .replaceAll('-', '_')
    .toLocaleUpperCase()}__`
    : key

  return useStorage<T>(getKey, initialValue, storage, {
    serializer: {
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
