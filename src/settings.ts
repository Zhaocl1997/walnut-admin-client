import type { ThemeCommonVars } from 'naive-ui/lib/_styles/common'
import { adjustColor } from '/@/utils/color'

const { appMemo, settings, app: AppPersistent } = useAppState()
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

export const getCustomTheme = computed(() =>
  AppPersistent.value.isDark
    ? settings.value.ForDevelopers.themes.dark
    : settings.value.ForDevelopers.themes.light
)

export const getCommonTheme = computed(
  (): Partial<ThemeCommonVars> => ({
    primaryColor: getCustomTheme.value.primaryColor,
    primaryColorHover: adjustColor(getCustomTheme.value.primaryColor, 40),
    primaryColorPressed: adjustColor(getCustomTheme.value.primaryColor, 20),
    primaryColorSuppl: adjustColor(getCustomTheme.value.primaryColor, -20),
    infoColor: getCustomTheme.value.infoColor,
    infoColorHover: adjustColor(getCustomTheme.value.infoColor, 40),
    infoColorPressed: adjustColor(getCustomTheme.value.infoColor, 20),
    infoColorSuppl: adjustColor(getCustomTheme.value.infoColor, -20),
    successColor: getCustomTheme.value.successColor,
    successColorHover: adjustColor(getCustomTheme.value.successColor, 40),
    successColorPressed: adjustColor(getCustomTheme.value.successColor, 20),
    successColorSuppl: adjustColor(getCustomTheme.value.successColor, -20),
    warningColor: getCustomTheme.value.warningColor,
    warningColorHover: adjustColor(getCustomTheme.value.warningColor, 40),
    warningColorPressed: adjustColor(getCustomTheme.value.warningColor, 20),
    warningColorSuppl: adjustColor(getCustomTheme.value.warningColor, -20),
    errorColor: getCustomTheme.value.errorColor,
    errorColorHover: adjustColor(getCustomTheme.value.errorColor, 40),
    errorColorPressed: adjustColor(getCustomTheme.value.errorColor, 20),
    errorColorSuppl: adjustColor(getCustomTheme.value.errorColor, -20),

    bodyColor: getCustomTheme.value.bodyColor,
    invertedColor: getCustomTheme.value.invertedColor,
  })
)
