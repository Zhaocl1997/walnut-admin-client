const { app: App, settings } = useAppState()
const { app, menu, header, tab } = settings.value.ForDevelopers

const getShouwMenuCollpase = computed(() => app.showMenu && menu.showCollapse)

export const getShowMenuCollapseButton = computed(
  () =>
    getShouwMenuCollpase.value &&
    menu.collapseMode === MenuCollapseModeConst.BUTTON
)

export const getShowMenuCollpaseIcon = computed(
  () =>
    getShouwMenuCollpase.value &&
    menu.collapseMode === MenuCollapseModeConst.ICON
)

export const getShowMenuCollapseBuiltIn = computed(() => {
  if (
    getShouwMenuCollpase.value &&
    menu.collapseMode !== MenuCollapseModeConst.ICON &&
    menu.collapseMode !== MenuCollapseModeConst.BUTTON
  ) {
    return menu.collapseMode as 'bar' | 'arrow-circle'
  }
  return false
})

export const getShowAside = computed(() => app.showLogo || app.showMenu)

export const getContentWidth = computed(() =>
  App.value.isMobile || !getShowAside.value
    ? '100vw'
    : App.value.collapse
    ? `calc(100vw - ${menu.collapsedWidth}px)`
    : `calc(100vw - ${menu.width}px)`
)
