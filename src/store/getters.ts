export const getters = {
  lang: (state: any) => state.app.lang,
  collapse: (state: any) => state.app.collapse,
  token: (state: any) => state.user.token,
  userInfo: (state: any) => state.user.userInfo,
  menus: (state: any) => state.menu.menus,
  keepAliveNames: (state: any) => state.menu.keepAliveRouteNames,
  tabs: (state: any) => state.tab.tabs,
}
