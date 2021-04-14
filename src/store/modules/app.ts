import type { Module } from 'vuex'
import type { AppModuleState, StoreState } from '../types'

import { AppI18n } from '/@/locales'

import { PersistentKeysEnum } from '/@/enums/persistent'
import { LocaleEnum } from '/@/enums/locale'
import { MutatationEnum } from '/@/enums/mutation'

import { getLocal, setLocal } from '/@/utils/persistent'

export const appModule: Module<AppModuleState, StoreState> = {
  namespaced: true,

  state: {
    lang: getLocal(PersistentKeysEnum.APP_LOCALE) || LocaleEnum.EN,
    collapse: false,
  },

  mutations: {
    [MutatationEnum.APP_TOGGLE_LANG]: (state, lang) => {
      state.lang = lang
      setLocal(PersistentKeysEnum.APP_LOCALE, lang)
    },

    [MutatationEnum.APP_TOGGLE_COLLAPSE]: (state, collapse) => {
      if (collapse === undefined) {
        state.collapse = !state.collapse
      } else {
        state.collapse = collapse
      }
    },
  },

  actions: {
    async commitAppLang({ commit }, lang) {
      const messages = await import(`../../locales/lang/${lang}.ts`)

      AppI18n.global.setLocaleMessage(lang, messages.default[lang])

      if (AppI18n.mode === 'legacy') {
        AppI18n.global.locale = lang
      } else {
        ;(AppI18n.global.locale as any).value = lang
      }

      commit(MutatationEnum.APP_TOGGLE_LANG, lang)
      document.querySelector('html')?.setAttribute('lang', lang)
    },

    commitMenuCollapse({ commit }, collapse) {
      commit(MutatationEnum.APP_TOGGLE_COLLAPSE, collapse)
    },
  },
}
