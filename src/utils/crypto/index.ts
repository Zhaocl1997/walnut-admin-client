import { Encryption } from './Crypto'

const {
  cryptoPersistKey,
  cryptoPersistIV,
  cryptoRequestKey,
  cryptoRequestIV,
  cryptoResponseKey,
  cryptoResponseIV,
} = useAppEnv('crypto')

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
