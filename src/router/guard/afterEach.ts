const appTab = useAppStoreTab()

export const createAfterEachGuard = (router: Router) => {
  router.afterEach((to, from) => {
    // finish loadingbar
    window.$loadingBar.finish()

    // if the route exists in tabs
    // and when going to the route, it carrys query
    // add the query to the tab for user experience
    const isExistInTab = appTab.tabs.some(i => i.name === to.name)
    if (isExistInTab && Reflect.ownKeys(to.query).length !== 0)
      appTab.setTabByName(to.name as string, { query: to.query })

    return true
  })
}
