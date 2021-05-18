import type { TabsContext } from '../types'
import { tabsKey } from '../utils/InjectionKey'
import { useContext } from '/@/hooks/core/useContext'

export const {
  setContext: setTabsContext,
  getContext: getTabsContext,
} = useContext<TabsContext>(tabsKey)
