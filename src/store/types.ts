import type { Menu } from '../router/types'
import type { AppTab } from '../layout/default/TheTab'

export interface AppModuleState {
  lang: string
  collapse: boolean
}

export interface UserModuleState {
  token: string
  userInfo: Recordable
}

export interface MenuModuleState {
  menus: Menu[]
  keepAliveRouteNames: string[]
}

export interface TabModuleState {
  tabs: AppTab[]
  cachedTabs: Map<symbol, any[]>
  currentRouteName: string
}

export type StoreState = {
  app: AppModuleState
  user: UserModuleState
  menu: MenuModuleState
  tab: TabModuleState
}
