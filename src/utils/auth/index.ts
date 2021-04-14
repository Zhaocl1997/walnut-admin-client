import { getLocal, removeLocal, setLocal } from '../persistent'
import { PersistentKeysEnum } from '/@/enums/persistent'

export const setToken = (token: string) => {
  setLocal(PersistentKeysEnum.AUTH_TOKEN, token)
}

export const getToken = () => {
  return getLocal(PersistentKeysEnum.AUTH_TOKEN)
}

export const removeToken = () => {
  removeLocal(PersistentKeysEnum.AUTH_TOKEN)
}
