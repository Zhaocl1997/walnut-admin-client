import type { TabsContext } from '../types'
import { tabsKey } from '../utils/InjectionKey'
import { useContext } from '/@/hooks/core/useContext'

const { setContext, getContext } = useContext<TabsContext>(tabsKey)

export const setTabsContext = (value: TabsContext) => {
  setContext(value)
}

export const getTabsContext = () => {
  return getContext()
}
