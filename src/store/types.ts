import type { AppTab } from '../layout/default/TheTab'

export interface TabModuleState {
  tabs: AppTab[]
  cachedTabs: Map<symbol, any[]>
  currentRouteName: string
}

export type StoreState = {
  tab: TabModuleState
}
