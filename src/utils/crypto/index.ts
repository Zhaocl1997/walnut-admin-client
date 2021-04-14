import { Encryption, EncryptionOptions } from './src/Crypto'

const cryptOptions: EncryptionOptions = {
  key: '000102030405060708090a0b0c0d0e0f',
  iv: '101112131415161718191a1b1c1d1e1f',
  method: 'AES',
  mode: 'CBC',
  padding: 'Pkcs7',
}

const createEncryption = (opt: EncryptionOptions) => {
  return new Encryption(opt)
}

export const AppEncryption = createEncryption(cryptOptions)
