import type { RemovableRef } from '@vueuse/core'
import type { AppMemory, AppStorage } from './types'

import { easyDeepClone } from 'easy-fns-ts'

import AppCustomSettings from '/@/settings.json'

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
        tabs: (JSON.parse(localStorage.getItem('tab')!) as AppTab[]) ?? [],
        visitedTabs: new Map(),
      },

      settings: {
        ForDevelopers: easyDeepClone(AppCustomSettings),

        ForUsers: {},
      },
    })
  )
)

export const useAppState = () =>
  Object.assign(useAppStateStorage(), useAppStateMemory())
