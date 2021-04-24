import { DEFAULT_PERSISTENT_TIME } from './const'
import { AppEncryption } from '/@/utils/crypto'

type StorageType = typeof localStorage | typeof sessionStorage

export interface StorageOptions {
  storage: StorageType
  prefixKey: string
  encrypt: boolean
}

export class Storage {
  private storage
  private prefixKey
  private encrypt

  constructor({ storage, prefixKey, encrypt }: StorageOptions) {
    this.storage = storage
    this.prefixKey = prefixKey
    this.encrypt = encrypt
  }

  private getKey(key: string) {
    return `${this.prefixKey}__${key}__`.toLocaleUpperCase()
  }

  set(key: string, value: any, expire = DEFAULT_PERSISTENT_TIME) {
    const stringifiedData = JSON.stringify({
      value,
      expire: expire !== null ? new Date().getTime() + expire : null,
    })
    const finalValue: any = this.encrypt
      ? AppEncryption.encrypt(stringifiedData)
      : stringifiedData
    this.storage.setItem(this.getKey(key), finalValue)
  }

  get(key: string, defaultValue = undefined) {
    const item = this.storage.getItem(this.getKey(key))
    if (item) {
      try {
        const realValue = this.encrypt ? AppEncryption.decrypt(item) : item
        const parsedData = JSON.parse(realValue)
        const { value, expire } = parsedData
        if (expire === null || expire >= new Date().getTime()) {
          return value
        }
        this.remove(key)
      } catch (e) {
        return defaultValue
      }
    }
    return defaultValue
  }

  remove(key: string) {
    this.storage.removeItem(this.getKey(key))
  }

  clear() {
    this.storage.clear()
  }
}
