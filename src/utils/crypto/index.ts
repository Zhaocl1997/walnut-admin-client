import { Encryption } from './Crypto'

export const AppPersistEncryption = new Encryption({
  key: import.meta.env.VITE_PERSIST_CRYPTO_KEY,
  iv: import.meta.env.VITE_PERSIST_CRYPTO_IV,
  method: 'AES',
  mode: 'CBC',
  padding: 'Pkcs7',
})

export const AppAxiosEncryption = new Encryption({
  key: import.meta.env.VITE_AXIOS_CRYPTO_KEY,
  iv: import.meta.env.VITE_AXIOS_CRYPTO_IV,
  method: 'AES',
  mode: 'CBC',
  padding: 'Pkcs7',
})
