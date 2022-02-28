const { appMemo, settings } = useAppState()
const { app, menu } = settings.value.ForDevelopers

const getShowMenuCollpase = computed(() => app.showMenu && menu.showCollapse)

export const getShowMenuCollapseButton = computed(
  () =>
    getShowMenuCollpase.value &&
    menu.collapseMode === MenuCollapseModeConst.BUTTON
)

export const getShowMenuCollpaseIcon = computed(
  () =>
    getShowMenuCollpase.value &&
    menu.collapseMode === MenuCollapseModeConst.ICON
)

export const getShowMenuCollapseBuiltIn = computed(() => {
  if (
    getShowMenuCollpase.value &&
    menu.collapseMode !== MenuCollapseModeConst.ICON &&
    menu.collapseMode !== MenuCollapseModeConst.BUTTON
  ) {
    return menu.collapseMode as 'bar' | 'arrow-circle'
  }
  return false
})

export const getShowAside = computed(() => app.showLogo || app.showMenu)

export const getShowNormalAside = computed(
  () => !appMemo.value.isMobile && getShowAside.value
)

export const getContentWidth = computed(() =>
  appMemo.value.isMobile || !getShowAside.value
    ? '100vw'
    : appMemo.value.collapse
    ? `calc(100vw - ${menu.collapsedWidth}px)`
    : `calc(100vw - ${menu.width}px)`
)

export const toggleLeftMenuLayout = (val = false) => {
  app.showHeader = val
  app.showLogo = val
  app.showMenu = val
  app.showTabs = val
  app.showFooter = val
}
