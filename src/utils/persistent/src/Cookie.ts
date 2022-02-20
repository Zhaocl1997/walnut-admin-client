import { isString } from 'easy-fns-ts'
import { AppEncryption } from '/@/utils/crypto'

export interface CookieOptions {
  prefixKey: string
  encrypt: boolean
}

export class Cookie {
  private prefixKey
  private encrypt

  constructor({ prefixKey, encrypt }: CookieOptions) {
    this.prefixKey = prefixKey
    this.encrypt = encrypt
  }

  private getKey(key: string) {
    return `${this.prefixKey}__${key}`.toLocaleUpperCase()
  }

  set(
    key: string,
    value: any,
    expire = import.meta.env.VITE_APP_CACHE_MAXAGE,
    path = '/'
  ) {
    value = isString(value) ? value : JSON.stringify(value)
    const finalValue = this.encrypt ? AppEncryption.encrypt(value) : value
    const exp = new Date()
    exp.setTime(exp.getTime() + expire)
    document.cookie = `${this.getKey(key)}=${escape(
      finalValue
    )};path=${path};expires=${exp.toUTCString()}`
  }

  get(key: string, defaultValue = null) {
    const arr = document.cookie.split('; ')
    for (let i = 0; i < arr.length; i++) {
      const arr2 = arr[i].split('=')

      if (arr2[0] === this.getKey(key)) {
        let result = null
        const val = arr2[1]

        if (this.encrypt && val) {
          result = AppEncryption.decrypt(unescape(val))
          try {
            return JSON.parse(result)
          } catch (e) {
            return val
          }
        }
        return isString(val) ? val : JSON.parse(unescape(val))
      }
    }
    return defaultValue
  }

  remove(key: string) {
    this.set(key, 1, -1)
  }

  clear() {
    const keys = document.cookie.match(/[^ =;]+(?==)/g)

    if (keys) {
      for (let i = keys.length; i--; ) {
        document.cookie = `${keys[i]}=0;expires=${new Date(
          0
        ).toUTCString()};path=/;`
      }
    }
  }
}
