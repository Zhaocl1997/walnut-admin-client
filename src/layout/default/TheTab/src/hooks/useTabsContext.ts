import type { TabsContext } from '../types/tabsContext'
import { tabsKey } from '../utils/InjectionKey'
import { useContext } from '/@/hooks/core/useContext'

const { setContext, getContext } = useContext<TabsContext>()

export const setTabsContext = (value: TabsContext) => {
  setContext(tabsKey, value)
}

export const getTabsContext = () => {
  return getContext(tabsKey)
}
