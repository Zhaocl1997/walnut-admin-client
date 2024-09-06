const appTab = useAppStoreTab()

export function createAfterEachGuard(router: Router) {
  router.afterEach((to, from) => {
    // finish loadingbar
    window.$loadingBar.finish()

    // if the route exists in tabs
    // and when going to the route, it carrys query
    // add the query to the tab for user experience
    const isExistInTab = appTab.tabs.some(i => i.name === to.name)
    if (isExistInTab && Reflect.ownKeys(to.query).length !== 0)
      appTab.setTabByName(to.name as string, { query: to.query })

    // if from page is not in keep-alive
    // when left, clear all unfinished requests using cancel tokens
    // since current page is not keep-alive, re-open current page will mount again
    if (!from.meta.cache) {
      removeCurrentPageRequests(from.path)
    }

    return true
  })
}
