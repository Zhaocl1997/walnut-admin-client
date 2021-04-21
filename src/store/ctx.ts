import type { AppContext } from '/@/App'
import { reactive } from 'vue'

/**
 * @description Here is where we initial app context.
 * If you find context grow to a large mount, feel free to expand the module.
 * Try to write your own Vuex through `provide`/`inject` api!
 */
export const AppGlobalContext = reactive<AppContext>({
  app: {
    isDark: false,
    darkMode: 'light',
    locale: 'zh_CN',
    collapse: false,
    device: 'desktop',
    isMobile: false,
    showAside: false,
  },

  arr: [
    {
      value: 1,
      name: 'aaa',
    },
    {
      value: 2,
      name: 'bbb',
    },
    {
      value: 3,
      name: 'ccc',
    },
  ],
})

export const getAppContextOutsideSetup = () => {
  return AppGlobalContext
}
