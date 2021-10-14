import type { TabsContext } from '../types'
import { tabsKey } from '../utils/InjectionKey'

export const { setContext: setTabsContext, getContext: getTabsContext } =
  useContext<TabsContext>(tabsKey)
