import type { RemoveableRef } from '@vueuse/core'
import { UserInfoType } from './types/user'

type RemoveableRefRecord<T> = {
  [P in keyof T]: RemoveableRef<T[P]>
}

interface AppStorage {
  app: {
    isDark: boolean
    darkMode: ValueOfDarkModeConst
    locale: ValueOfLocaleConst
    collapse: boolean
    device: ValueOfDevideConst
    isMobile: boolean
    showAside: boolean
  }

  token: string

  auth: {
    username?: string
    password?: string
  }
}

interface AppMemory {
  menu: {
    menus: AppMenu[]
    keepAliveRouteNames: string[]
    indexMenuName: string
  }

  user: {
    userInfo: Partial<UserInfoType>
  }

  tab: {
    tabs: AppTab[]
    visitedTabs: string[]
  }
}

const useAppStateStorage = createGlobalState<RemoveableRefRecord<AppStorage>>(
  () => ({
    app: useAppStorage(PersistentKeysConst.APP, {
      isDark: false,
      darkMode: 'light',
      locale: 'zh_CN',
      collapse: false,
      device: 'desktop',
      isMobile: false,
      showAside: false,
    }),
    token: useAppStorage(PersistentKeysConst.TOKEN, ''),
    auth: useAppStorage(PersistentKeysConst.AUTH, {}),
  })
)

const useAppStateMemory = createGlobalState<AppMemory>(() => ({
  menu: {
    menus: [],
    keepAliveRouteNames: [],
    indexMenuName: '',
  },
  user: {
    userInfo: {},
  },
  tab: {
    tabs: [],
    visitedTabs: [],
  },
}))

useAppStateStorage()
useAppStateMemory()

export const useAppState = () =>
  Object.assign(useAppStateStorage(), useAppStateMemory())
