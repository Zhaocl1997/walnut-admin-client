import { unref } from 'vue'
import { useContext } from './hooks/core/useContext'

const key = Symbol('appGlobalConfig')

export const useAppGlobalConfig = () => {
  const { setContext, getContext } = useContext()

  const setAppGlobalConfig = (initialState: any) => {
    setContext(key, initialState)
  }

  const getAppGlobalConfig = () => {
    return unref(getContext(key))
  }

  return {
    setAppGlobalConfig,
    getAppGlobalConfig,
  }
}
