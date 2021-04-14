import type { Module } from 'vuex'
import { MenuModuleState, StoreState } from '../types'
import { MutatationEnum } from '/@/enums/mutation'
import { createPermissions } from '../../router/core'

export const menuModule: Module<MenuModuleState, StoreState> = {
  namespaced: true,

  state: {
    menus: [],
    keepAliveRouteNames: [],
  },

  mutations: {
    [MutatationEnum.SET_MENU]: (state, menu) => {
      state.menus = menu
    },
    [MutatationEnum.SET_KEEPALIVE]: (state, names) => {
      state.keepAliveRouteNames = names
    },
  },

  actions: {
    async commitPermissions({ commit }) {
      const { menus, routes, keepAliveRouteNames } = await createPermissions()

      // Here we set menu and keep alive name lists
      commit(MutatationEnum.SET_MENU, menus)
      commit(MutatationEnum.SET_KEEPALIVE, keepAliveRouteNames)

      return routes
    },
  },
}
