import type { AppContext } from '/@/App'
import type { AppTab } from '../layout/default/TheTab'

import { reactive } from 'vue'
import { easyOmit } from 'easy-fns-ts'

import { getToken } from '../utils/auth'
import { RootRoute } from '../router/constant'

const defaultTab = [
  { ...easyOmit(RootRoute.children![0], 'component') } as AppTab,
]

/**
 * @description Here is where we initial app context.
 * If you find context grow to a large mount, feel free to expand the module.
 * Try to write your own Vuex through `provide`/`inject` api!
 */
export const AppGlobalContext = reactive<AppContext>({
  app: {
    isDark: false,
    darkMode: 'light',
    locale: 'zh_CN',
    collapse: false,
    device: 'desktop',
    isMobile: false,
    showAside: false,
  },

  menu: {
    menus: [],
    keepAliveRouteNames: [],
  },

  user: {
    token: getToken(),
    userInfo: {},
  },

  tab: {
    tabs: defaultTab,
    cachedTabs: new Map(),
    currentTabName: '',
  },
})
