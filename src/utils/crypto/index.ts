import { Encryption } from './Crypto'

const [cryptoPersistKey, cryptoPersistIV] = JSON.parse(
  import.meta.env.VITE_CRYPTO_PERSIST,
)

const [cryptoRequestKey, cryptoRequestIV] = JSON.parse(
  import.meta.env.VITE_CRYPTO_REQUEST,
)

const [cryptoResponseKey, cryptoResponseIV] = JSON.parse(
  import.meta.env.VITE_CRYPTO_RESPONSE,
)

export const AppPersistEncryption = new Encryption({
  key: cryptoPersistKey,
  iv: cryptoPersistIV,
})

export const AppRequestEncryption = new Encryption({
  key: cryptoRequestKey,
  iv: cryptoRequestIV,
})

export const AppResponseEncryption = new Encryption({
  key: cryptoResponseKey,
  iv: cryptoResponseIV,
})
