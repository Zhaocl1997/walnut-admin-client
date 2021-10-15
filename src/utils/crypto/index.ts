import { Encryption, EncryptionOptions } from './Crypto'

const cryptOptions: EncryptionOptions = {
  key: import.meta.env.VITE_CRYRTO_KEY,
  iv: import.meta.env.VITE_CRYRTO_IV,
  method: 'AES',
  mode: 'CBC',
  padding: 'Pkcs7',
}

export const AppEncryption = new Encryption(cryptOptions)
