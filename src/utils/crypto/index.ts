import { Encryption } from './Crypto'

export const AppPersistEncryption = new Encryption({
  key: import.meta.env.VITE_PERSIST_CRYPTO_KEY,
  iv: import.meta.env.VITE_PERSIST_CRYPTO_IV,
})

export const AppRequestEncryption = new Encryption({
  key: import.meta.env.VITE_REQUEST_CRYPTO_KEY,
  iv: import.meta.env.VITE_REQUEST_CRYPTO_IV,
})

export const AppResponseEncryption = new Encryption({
  key: import.meta.env.VITE_RESPONSE_CRYPTO_KEY,
  iv: import.meta.env.VITE_RESPONSE_CRYPTO_IV,
})
