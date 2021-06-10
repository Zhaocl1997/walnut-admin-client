import type { AppContext } from '/@/App'

import { reactive } from 'vue'
import { getToken } from '../utils/auth'

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
    tabs: [],
    cachedTabs: new Map(),
    currentTabName: '',
  },
})
