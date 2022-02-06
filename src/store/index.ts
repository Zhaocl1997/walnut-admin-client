import type { RemovableRef } from '@vueuse/core'
import type { AppMemory, AppStorage } from './types'
import { defaultTheme } from '../settings/theme'
import { easyDeepClone } from 'easy-fns-ts'

const preferredLanguages = usePreferredLanguages()
const preferredColor = usePreferredColorScheme()

type RemoveableRefRecord<T> = {
  [P in keyof T]: RemovableRef<T[P]>
}

const useAppStateStorage = createGlobalState<RemoveableRefRecord<AppStorage>>(
  () => ({
    app: useAppStorage(PersistentKeysConst.APP, {
      isDark: preferredColor.value === DarkModeConst.DARK ? true : false,
      darkMode: preferredColor.value as ValueOfDarkModeConst,
      locale: preferredLanguages.value[0] as ValueOfLocaleConst,
      isLock: false,
      lockMode: AppLockModeConst.AUTO,
    }),
    token: useAppStorage(PersistentKeysConst.TOKEN, ''),
    auth: useAppStorage(PersistentKeysConst.AUTH, {}),
  })
)

const useAppStateMemory = createGlobalState<ToRefs<AppMemory>>(() =>
  toRefs(
    reactive({
      appMemo: {
        collapse: false,
        device: DevideConst.DESKTOP,
        isMobile: false,
        showAside: false,
      },
      menu: {
        menus: [],
        keepAliveRouteNames: [],
        indexMenuName: '',
        permissions: [],
      },
      user: {
        userInfo: {},
      },
      tab: {
        tabs: [],
        visitedTabs: new Map(),
      },

      settings: {
        ForDevelopers: {
          themes: easyDeepClone(defaultTheme.light),

          app: {
            showLogo: true,
            showMenu: true,
            showHeader: true,
            showTabs: true,
            showFooter: true,

            fixLogo: true,
            fixHeader: true,
            fixFooter: true,

            showAnimation: true,
            animationName: TransitionNameConst.FADE,

            keepAlive: false,

            layout: AppLayoutModeConst.LEFT_MENU,

            pageLeaveLock: false,
            idleMS: 1000 * 60,
          },

          menu: {
            showCollapse: true,
            collapseMode: MenuCollapseModeConst.BAR,
            width: 240,
            collapsedWidth: 64,
            accordion: false,
            collapsedIconSize: 24,
            iconSize: 26,
            indent: 16,
            inverted: true,
          },

          header: {
            height: 48,
            showBreadcrumb: true,
            showFullScreen: true,
            showLocale: true,
            showDarkMode: true,
            showLock: true,
            showSearch: true,
            inverted: true,
          },

          tab: {
            height: 32,
            showIcon: false,
            showUtils: true,
            contextMenu: true,
            sortable: false,
            styleMode: TabStyleModeConst.CARD,
            devtool: true,
          },

          breadcrumb: {
            showIcon: true,
            showDropdown: true,
            separator: '>',
          },
        },

        ForUsers: {},
      },
    })
  )
)

export const useAppState = () =>
  Object.assign(useAppStateStorage(), useAppStateMemory())
