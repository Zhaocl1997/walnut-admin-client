// https://github.com/YousefED/typescript-json-schema
// this interface is used to generate json schema
// change this file carefully
// all types below must be explicit import, no auto-import
interface AppSettings {
  themes: {
    primaryColor: string
    infoColor: string
    successColor: string
    warningColor: string
    errorColor: string
    bodyColor: string
    invertedColor: string
  }

  app: {
    /**
     * App Logo Visibility
     */
    showLogo: boolean
    showMenu: boolean
    showHeader: boolean
    showTabs: boolean
    showFooter: boolean

    fixLogo: boolean
    fixHeader: boolean
    fixFooter: boolean

    showAnimation: boolean
    animationName:
      | 'fade'
      | 'scale'
      | 'zoom-out'
      | 'zoom-fade'
      | 'slide-up'
      | 'slide-right'
      | 'slide-down'
      | 'slide-left'
      | 'scroll-up'
      | 'scroll-right'
      | 'scroll-down'
      | 'scroll-left'

    keepAlive: boolean

    layout: 'left-menu' | 'top-menu'

    pageLeaveLock: boolean
    idleMS: number
  }

  menu: {
    showCollapse: boolean
    collapseMode: 'icon' | 'bar' | 'arrow-circle' | 'button'
    width: number
    collapsedWidth: number
    accordion: boolean
    collapsedIconSize: number
    iconSize: number
    indent: number
    inverted: boolean
  }

  header: {
    height: number
    showBreadcrumb: boolean
    showFullScreen: boolean
    showLocale: boolean
    showDarkMode: boolean
    showLock: boolean
    showSearch: boolean
    inverted: boolean
  }

  tab: {
    height: number
    showIcon: boolean
    showUtils: boolean
    contextMenu: boolean
    sortable: boolean
    styleMode: 'round' | 'flex' | 'card'
    devtool: boolean
  }

  breadcrumb: {
    showIcon: boolean
    showDropdown: boolean
    separator: string
  }
}
