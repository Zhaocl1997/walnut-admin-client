export const useAppStateStorage = createGlobalState(() => ({
  app: useAppStorage('app__global', {
    isDark: false,
    darkMode: 'light',
    locale: 'zh_CN',
    collapse: false,
    device: 'desktop',
    isMobile: false,
    showAside: false,
  }),
  token: useAppStorage('app__token', ''),
}))

export const useAppStateMemory = createGlobalState(() => ({
  menu: {
    menus: [],
    keepAliveRouteNames: [],
  },
  user: {
    userInfo: {},
  },
  tab: {
    tabs: [],
    visitedTabs: [],
  },
}))

useAppStateStorage()
useAppStateMemory()
