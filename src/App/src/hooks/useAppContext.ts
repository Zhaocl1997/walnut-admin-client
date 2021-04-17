import type { ToRefs } from 'vue'
import type { AppContext } from '../types'

import { useContext } from '/@/hooks/core/useContext'
import { appKey } from '../utils/InjectionKey'

const { setContext, getContext } = useContext<ToRefs<AppContext>>()

export const setAppContext = (initialState: ToRefs<AppContext>) => {
  setContext(appKey, initialState)
}

export const getAppContext = () => {
  return getContext(appKey)
}
