/**
 * https://github.com/YousefED/typescript-json-schema
 * this interface is also used to generate json schema
 * if change this file, please in terminal run `npm run gen:schema` to generate `settings.json` VS Code support
 * all types below must be explicit import, no auto-import or global usage
 */
import { ValueOfAppConstTransitionName } from '../src/const/transition'
import {
  ValueOfAppConstLayoutMode,
  ValueOfAppConstCollapseMode,
  ValueOfAppConstTabStyleMode,
  ValueOfAppConstAnimationMode,
  ValueOfAppConstColorMode,
  ValueOfAppConstLockMode,
} from '../src/const/app'
import { ValueOfAppConstTabUtilsShowMode } from '../src/const/tab'

interface AppSettings {
  /**
   * See more in naive-ui docs
   */
  themes: {
    light: {
      primaryColor: string
      infoColor: string
      successColor: string
      warningColor: string
      errorColor: string
      bodyColor: string
      invertedColor: string
    }
    dark: {
      primaryColor: string
      infoColor: string
      successColor: string
      warningColor: string
      errorColor: string
      bodyColor: string
      invertedColor: string
    }
  }

  app: {
    /**
     * App Logo visibility
     */
    showLogo: boolean

    /**
     * App Menu visibility
     */
    showMenu: boolean

    /**
     * App Header visibility
     */
    showHeader: boolean

    /**
     * App Tabs visibility
     */
    showTabs: boolean

    /**
     * App Footer visibility
     */
    showFooter: boolean

    /**
     * Logo fixed left side
     */
    fixLogo: boolean

    /**
     * Header fixed in top
     */
    fixHeader: boolean

    /**
     * Footer fixed in bottom
     */
    fixFooter: boolean

    /**
     * Page change animation
     */
    showAnimation: boolean

    /**
     * Animation mode. `global` or `scope`. `scope` means use router object meta animation
     */
    animationMode: ValueOfAppConstAnimationMode

    /**
     * Page change animation name
     */
    animationName: ValueOfAppConstTransitionName

    /**
     * Keep alive pages
     */
    keepAlive: boolean

    /**
     * App Layout
     */
    layout: ValueOfAppConstLayoutMode

    /**
     * App lock mode
     */
    lockMode: ValueOfAppConstLockMode

    /**
     * User inactive milliseconds to lock app
     */
    idleMS: number

    /**
     * Content padding, default 1rem
     */
    contentPadding: number

    /**
     * Full screen watermark show
     */
    showWatermark: boolean

    /**
     * Full screen watermark content
     */
    watermarkContent: string

    /**
     * Custom color mode
     */
    colorMode: ValueOfAppConstColorMode

    /**
     * reactive prefers-reduced-motion
     */
    reducedMotion: boolean
  }

  menu: {
    /**
     * Show collapse button
     */
    showCollapse: boolean

    /**
     * Menu Collapse Mode
     */
    collapseMode: ValueOfAppConstCollapseMode

    /**
     * When app layout is `left-menu`, menu width
     */
    width: number

    /**
     * When app layout is `left-menu`, menu collapsed width
     */
    collapsedWidth: number

    /**
     * Menu accordion
     */
    accordion: boolean

    /**
     * Menu collapsed icon size
     */
    collapsedIconSize: number

    /**
     * Menu icon size
     */
    iconSize: number

    /**
     * Menu indent
     */
    indent: number

    /**
     * Menu inverted color
     */
    inverted: boolean
  }

  header: {
    /**
     * Header height
     */
    height: number

    /**
     * Header breadcrumb visibility
     */
    showBreadcrumb: boolean

    /**
     * Header utils - full screen visibility
     */
    showFullScreen: boolean

    /**
     * Header utils - locale picker visibility
     */
    showLocale: boolean

    /**
     * Header utils - dark mode visibility
     */
    showDarkMode: boolean

    /**
     * Header utils - lock visibility
     */
    showLock: boolean

    /**
     * Header utils - search visibility
     */
    showSearch: boolean

    /**
     * Header inverted color
     */
    inverted: boolean
  }

  tab: {
    /**
     * Tab height
     */
    height: number

    /**
     * Tab icon visibility
     */
    showIcon: boolean

    /**
     * Tab aside utils visibility
     */
    showUtils: boolean

    /**
     * Tab aside utils display mode
     */
    showUtilsMode: ValueOfAppConstTabUtilsShowMode

    /**
     * Tab context menu visibility
     */
    contextMenu: boolean

    /**
     * Tab sortable
     */
    sortable: boolean

    /**
     * Tab style mode
     */
    styleMode: ValueOfAppConstTabStyleMode

    /**
     * Tab devtool, only work in dev env
     */
    devtool: boolean

    /**
     * With persistent support
     */
    persistent: boolean

    /**
     * Tab animation name
     */
    animationName: ValueOfAppConstTransitionName
  }

  breadcrumb: {
    /**
     * Breadcrumb icon visibility
     */
    showIcon: boolean

    /**
     * Breadcrumb dropdown visibility
     */
    showDropdown: boolean

    /**
     * Breadcrumb custom separator
     */
    separator: string
  }
}
