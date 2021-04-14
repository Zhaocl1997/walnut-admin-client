import type { Module } from 'vuex'
import type { AppTab } from '/@/layout/default/TheTab'
import type { TabModuleState, StoreState } from '../types'

import { easyOmit } from 'easy-fns-ts'

import { MutatationEnum } from '/@/enums/mutation'
import { DeleteTabTypeEnum } from '/@/enums/tab'
import { SymbolKeyEnum } from '/@/enums/symbol'

import { useRouterPush } from '/@/router'
import {
  indexName,
  RootRoute,
  notFoundName,
  redirectName,
} from '/@/router/constant'

const tabSymbolKey = Symbol(SymbolKeyEnum.STORE_TAB_KEY)

const defaultTab = [{ ...easyOmit(RootRoute.children![0], 'component') } as any]
const nameBlackList: string[] = [notFoundName, redirectName]

export const tabModule: Module<TabModuleState, StoreState> = {
  namespaced: true,

  state: {
    tabs: defaultTab,
    cachedTabs: new Map(),
    currentRouteName: '',
  },

  mutations: {
    // Close multiple tab by names list
    closeMultipleTabs: (state, nameLists: string[]) => {
      state.tabs = state.tabs.filter((item) => !nameLists.includes(item.name))
    },

    [MutatationEnum.CREATE_TAB]: (state, tab: AppTab) => {
      // redirect/404 etc pages do not need to add into tab
      if (nameBlackList.includes(tab.name)) {
        return
      }

      const index = state.tabs.findIndex((item) => item.name === tab.name)

      state.currentRouteName = tab.name

      if (index === -1) {
        const cached = state.cachedTabs.get(tabSymbolKey)

        if (!cached || (cached && !cached.includes(tab.name))) {
          state.tabs.push(tab)
        }
      }

      state.cachedTabs.set(
        tabSymbolKey,
        state.tabs.map((item) => item.name)
      )
    },

    // remove tab core
    [MutatationEnum.DELETE_TAB]: (state, { name, type }) => {
      const index = state.tabs.findIndex((item) => item.name === name)

      switch (type) {
        // single close
        case DeleteTabTypeEnum.TAB_SELF:
          {
            index !== -1 && state.tabs.splice(index, 1)

            // Close current tab
            if (state.currentRouteName === name) {
              const next = state.tabs[index]
              const previous = state.tabs[index - 1]

              // Got next tab, push to next. Else push to previous one
              if (next) {
                useRouterPush({ name: next.name })
              } else {
                useRouterPush({ name: previous.name })
              }
            }
          }
          break

        // close left tabs
        case DeleteTabTypeEnum.TAB_LEFT:
          {
            const namesList: string[] = []

            state.tabs.map((item, i) => {
              if (i < index && !item.meta.affix) {
                namesList.push(item.name)
              }
            })

            // If left include current route, we need to push to target route
            if (namesList.includes(state.currentRouteName)) {
              useRouterPush({ name: name })
            }

            tabModule.mutations!.closeMultipleTabs(state, namesList)
          }
          break

        // close right tabs
        case DeleteTabTypeEnum.TAB_RIGHT:
          {
            const namesList: string[] = []

            state.tabs.map((item, i) => {
              if (i > index && !item.meta.affix) {
                namesList.push(item.name)
              }
            })

            // If right include current route, we need to push to target route
            if (namesList.includes(state.currentRouteName)) {
              useRouterPush({ name: name })
            }

            tabModule.mutations!.closeMultipleTabs(state, namesList)
          }
          break

        // close other tabs
        case DeleteTabTypeEnum.TAB_OTHER:
          {
            const namesList: string[] = []

            state.tabs.map((item) => {
              if (item.name !== name && !item.meta.affix) {
                namesList.push(item.name)
              }
            })

            // If the closed one is not current route, we need to push to target route
            if (state.currentRouteName !== name) {
              useRouterPush({ name: name })
            }

            tabModule.mutations!.closeMultipleTabs(state, namesList)
          }
          break

        // close all tabs
        case DeleteTabTypeEnum.TAB_ALL:
          {
            const namesList: string[] = []

            state.tabs.map((item) => {
              if (!item.meta.affix) {
                namesList.push(item.name)
              }
            })

            // Just back to index page
            useRouterPush({ name: indexName })

            tabModule.mutations!.closeMultipleTabs(state, namesList)
          }
          break

        default:
          break
      }
    },

    [MutatationEnum.CLEAR_TAB]: (state) => {
      state.tabs.length = 0
      state.cachedTabs.clear()
    },
  },

  actions: {
    commitRouteChange({ commit }, tab) {
      commit(MutatationEnum.CREATE_TAB, tab)
    },

    commitDeleteTab({ commit }, payload) {
      commit(MutatationEnum.DELETE_TAB, payload)
    },

    commitClearTab({ commit }) {
      commit(MutatationEnum.CLEAR_TAB)
    },
  },
}
