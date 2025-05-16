import { merge } from 'lodash-es'
import { defineStore } from 'pinia'
import { StoreKeys, tabBlackListName } from '../../constant'
import { store } from '../../pinia'

/**
 * below two only work for `timeout` title and icon
 */
const _title_map_ = new Map()
const _icon_map_ = new Map()

/**
 * only serve for one purpose
 * when manually close the `leaveTip` tab, it would trigger twice
 * first in tab close event(has to do it, otherwise the tab will disappear first and popup the confirm)
 * second in route guard
 * to fix trigger twice problem, i implement the map to record the `leaveTip` route confirmed state
 * and with the new logic in route guard, it will work fine for once in tab close event
 */
export const _confirm_leave_map_ = new Map()

const useAppStoreTabInside = defineStore(StoreKeys.APP_TAB, {
  state: (): IAppStoreTab => ({
    tabs: [],
    iframeList: [],
    visitedTabs: new Map(),
  }),

  getters: {
    getCurrentIndex(state): number {
      return state.tabs.findIndex(
        i => AppRouter.currentRoute.value.name === i.name,
      )
    },

    getCurrentTab(state): AppTab {
      return state.tabs[this.getCurrentIndex]
    },

    // get tab name list that should not appear
    getTabBlackListName() {
      const appSetting = useAppStoreSetting()

      return appSetting.getLockStatus
        ? tabBlackListName.concat(AppLockName)
        : AppLockName
    },
  },

  actions: {
    /**
     * @description set single tab state through index in tabs
     */
    setTabByIndex(index: number, payload: Partial<AppTab>, type: 'merge' | 'splice' = 'merge') {
      if (type === 'merge')
        this.tabs[index] = merge(this.tabs[index], payload)

      if (type === 'splice')
        this.tabs.splice(index, 1, payload as AppTab)
    },

    /**
     * @description set single tab state through name in tabs
     */
    setTabByName(name: string, payload: Partial<AppTab>, type: 'merge' | 'splice' = 'merge') {
      const index = this.tabs.findIndex(i => i.name === name)
      if (index !== -1)
        this.setTabByIndex(index, payload, type)
    },

    /**
     * @description set single tab meta data
     */
    setTabMeta(name: string, meta: AppTabMeta) {
      const index = this.tabs.findIndex(i => i.name === name)

      if (index === -1)
        return

      this.setTabByIndex(index, {
        meta,
      })
    },

    /**
     * @description set current tab meta data
     */
    setCurrentTabMeta(meta: AppTabMeta) {
      this.setTabMeta(this.tabs[this.getCurrentIndex].name, meta)
    },

    /**
     * @description set tab dynamic title
     * support speed and title horizontal scrolling
     */
    setTabTitle(
      name: string,
      title: string,
      options: AppTabExtendTitleOptions = {
        timeout: 5000,
        maxLength: 10,
        speed: 5000,
      },
    ) {
      const index = this.tabs.findIndex(i => i.name === name)

      if (index === -1)
        return

      const { timeout = 5000, maxLength = 10, speed = timeout } = options

      this.setTabByIndex(index, {
        meta: {
          _title: title,
          _title_maxLength: maxLength,
          _title_speed: speed,
        },
      })

      if (timeout) {
        const name = this.tabs[index].name

        const { stop } = useTimeoutFn(() => {
          this.recoverTabTitle(name)
        }, timeout)

        _title_map_.set(name, stop)
      }
    },

    /**
     * @description recover tab title
     */
    recoverTabTitle(name: string) {
      const index = this.tabs.findIndex(i => i.name === name)

      if (index === -1)
        return

      this.setTabByIndex(index, {
        meta: {
          _title: this.tabs[index].meta.title,
        },
      })

      _title_map_.get(name) && _title_map_.get(name)()
      _title_map_.delete(name)
    },

    /**
     * @description set current tab dynamic title
     * support timeout and title scrolling
     */
    setCurrentTabTitle(
      title: string,
      options: AppTabExtendTitleOptions = {
        timeout: 5000,
        maxLength: 10,
        speed: 5000,
      },
    ) {
      this.setTabTitle(this.tabs[this.getCurrentIndex].name, title, options)
    },

    /**
     * @description recover current tab title
     */
    recoverCurrentTabTitle() {
      this.recoverTabTitle(this.tabs[this.getCurrentIndex].name)
    },

    /**
     * @description set tab dynamic icon
     * support timeout and bounce animate
     */
    setTabIcon(
      name: string,
      icon: string,
      options: AppTabExtendIconOptions = {
        timeout: 5000,
        animate: false,
        duration: 1000,
      },
    ) {
      const index = this.tabs.findIndex(i => i.name === name)

      if (index === -1)
        return

      const { timeout = 5000, animate = false, duration = 1000 } = options

      this.setTabByIndex(index, {
        meta: {
          _icon: icon,
          _icon_animate: animate,
          _icon_animate_duration: duration,
        },
      })

      if (timeout) {
        const name = this.tabs[index].name

        const { stop } = useTimeoutFn(() => {
          this.recoverTabIcon(name)
        }, timeout)

        _icon_map_.set(name, stop)
      }
    },

    /**
     * @description recover tab icon
     */
    recoverTabIcon(name: string) {
      const index = this.tabs.findIndex(i => i.name === name)

      if (index === -1)
        return

      this.setTabByIndex(index, {
        meta: {
          _icon: this.tabs[index].meta.icon,
          _icon_animate: false,
        },
      })

      _icon_map_.get(name) && _icon_map_.get(name)()
      _icon_map_.delete(name)
    },

    /**
     * @description set current tab dynamic icon
     * support timeout and bounce animate
     */
    setCurrentTabIcon(
      icon: string,
      options: AppTabExtendIconOptions = {
        timeout: 5000,
        animate: false,
        duration: 1000,
      },
    ) {
      this.setTabIcon(this.tabs[this.getCurrentIndex].name, icon, options)
    },

    /**
     * @description recover current tab icon
     */
    recoverCurrentTabIcon() {
      this.recoverTabIcon(this.tabs[this.getCurrentIndex].name)
    },

    setTabs(payload: AppTab[]) {
      this.tabs = payload
    },

    setVisitedTabs() {
      // set visited tabs
      this.visitedTabs.set(
        AppConstSymbolKey.TABS_KEY,
        this.tabs.map(item => item.name),
      )
    },

    /**
     * @description create tab object based on route object
     */
    createTabByRoute(route: RouteLocationNormalizedLoaded): AppTab {
      return {
        name: route.name as string,
        path: route.path,
        meta: route.meta,
        query: route.query,
        params: route.params,
      }
    },

    /**
     * @description create tabs main function
     */
    createTabs(payload: AppTab, method: 'push' | 'unshift' = 'push') {
      // redirect/404 etc pages do not need to add into tab
      if (this.getTabBlackListName.includes(payload.name))
        return

      const index = this.tabs.findIndex(item => item.name === payload.name)

      // not found
      if (index === -1) {
        const cached = this.visitedTabs.get(AppConstSymbolKey.TABS_KEY)

        // TODO what if detail page multiple ? cannot just use name as a key, maybe should use fullPath

        // use payload.name to splice the existed one in tabs
        const index1 = this.tabs.findIndex(
          i => i.meta.menuActiveName === payload.name,
        )

        if (index1 !== -1 && this.tabs[index1].meta.menuActiveSameTab) {
          this.tabs.splice(index1, 1, payload)
          return
        }

        // use payload.meta.menuActiveName to splice the existed one in tabs
        const index2 = this.tabs.findIndex(
          i => i.name === payload.meta.menuActiveName,
        )

        if (index2 !== -1 && payload.meta.menuActiveSameTab) {
          this.tabs.splice(index2, 1, payload)
          return
        }

        if (!cached || (cached && !cached.includes(payload.name)))
          this.tabs[method](payload)
      }
      // else {
      //   // if found, update tab
      //   this.tabs[index] = payload
      // }

      this.setVisitedTabs()
    },

    /**
     * @description delete multiple tabs based on name list
     */
    deleteTabsByNameList(lists: string[]) {
      this.tabs = this.tabs.filter(i => !lists.includes(i.name))
    },

    /**
     * @description delete single tab based on name and type
     */
    async deleteTabs(
      name: string,
      type: ValueOfAppConstTabDeleteType = AppConstTabDeleteType.TAB_SINGLE,
    ) {
      const { currentRoute } = AppRouter
      const currentRouteName = currentRoute.value.name as string

      const index = this.tabs.findIndex(item => item.name === name)

      if (index === -1)
        return

      const currentTab = this.tabs[index]

      switch (type) {
        case AppConstTabDeleteType.TAB_SINGLE:
          // if close current tab, router push forward or backward
          if (currentRouteName === name) {
            if (currentTab.meta.leaveTip) {
              const res = await useAppConfirm(
                // @ts-expect-error fuck t
                AppI18n.global.t('app.base.leaveTip'),
                {
                  closable: false,
                  closeOnEsc: false,
                  maskClosable: false,
                },
              )

              if (res) {
                _confirm_leave_map_.set(name, true)
                // simple splice
                this.tabs.splice(index, 1)

                // TODO bug
              }
            }
            else {
              // simple splice
              this.tabs.splice(index, 1)
            }

            const next = this.tabs[index]
            const previous = this.tabs[index - 1]

            // Got next tab, push to next. Else push to previous one

            await this.goTab(
              next ? next.name : previous.name,
              next ? next.query : previous.query,
              next ? next.params : previous.params,
            )
          }
          else {
            // simple splice
            this.tabs.splice(index, 1)
          }
          break

        case AppConstTabDeleteType.TAB_LEFT:
          {
            const nameList: string[] = []

            this.tabs.forEach((item, i) => {
              if (i < index && !item.meta.affix)
                nameList.push(item.name)
            })

            // If left include current page, we need to push to target route
            if (nameList.includes(currentRouteName))
              await this.goTab(name, currentTab.query, currentTab.params)

            this.deleteTabsByNameList(nameList)
          }
          break

        case AppConstTabDeleteType.TAB_RIGHT:
          {
            const nameList: string[] = []

            this.tabs.forEach((item, i) => {
              if (i > index && !item.meta.affix)
                nameList.push(item.name)
            })

            // If right include current page, we need to push to target route
            if (nameList.includes(currentRouteName))
              await this.goTab(name, currentTab.query, currentTab.params)

            this.deleteTabsByNameList(nameList)
          }
          break

        case AppConstTabDeleteType.TAB_OTHER:
          {
            const nameList: string[] = []

            this.tabs.forEach((item) => {
              // find no affixed tabs except self
              if (item.name !== name && !item.meta.affix)
                nameList.push(item.name)
            })

            // If the closed one is not current route, we need to push to target route
            if (currentRouteName !== name)
              await this.goTab(name, currentTab.query, currentTab.params)

            this.deleteTabsByNameList(nameList)
          }
          break

        case AppConstTabDeleteType.TAB_ALL:
          {
            const nameList: string[] = []
            const appMenu = useAppStoreMenu()

            this.tabs.forEach((item) => {
              // find all not affixed tabs
              if (!item.meta.affix)
                nameList.push(item.name)
            })

            // Just back to index page
            await this.goTab(
              appMenu.indexMenuName!,
              currentTab.query,
              currentTab.params,
            )

            this.deleteTabsByNameList(nameList)
          }
          break

        default:
          break
      }

      this.setVisitedTabs()
    },

    /**
     * @description clear all tabs and visitedTabs
     */
    clearTabs() {
      this.setTabs([])
      this.visitedTabs.clear()
    },

    /**
     * @description change two tabs position by index
     */
    changeTabOrder(oldIndex: number, newIndex: number) {
      const currentTab = this.tabs[oldIndex]
      this.tabs.splice(oldIndex, 1)
      this.tabs.splice(newIndex, 0, currentTab)
    },

    /**
     * @description sort tabs based on affixed tabs
     */
    sortTabs() {
      this.tabs = this.tabs.sort(
        (a, b) => Number(b.meta.affix) - Number(a.meta.affix),
      )
    },

    /**
     * @description click tab and push to target route
     */
    async goTab(name: string, query?: any, params?: any) {
      await useAppRouterPush({
        name,
        query,
        params,
      })
    },

    /**
     * @description set initial affixed tabs
     */
    setAffixedTabs(payload: AppTab[]) {
      payload.map(tab => this.createTabs(tab, 'unshift'))
    },

    /**
     * @description set iframe list
     */
    setIframeList(payload: IAppTabIframe[]) {
      this.iframeList = payload
    },

    /**
     * @description leave some room for tab index for beauty
     */
    leaveRoomForTabs(index: number) {
      // to keep current tab close to center
      if (index > 5)
        return index - 4

      // first ten tabs just don't scroll anyway
      if (index < 10)
        return 0

      return index
    },
  },
})

const useAppStoreTabOutside = () => useAppStoreTabInside(store)

export function useAppStoreTab() {
  if (getCurrentInstance())
    return useAppStoreTabInside()
  return useAppStoreTabOutside()
}
