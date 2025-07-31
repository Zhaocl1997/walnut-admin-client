import type { App } from 'vue'
import type { RouteLocationRaw } from 'vue-router'

import { createRouter, createWebHistory } from 'vue-router'
import { createRouterGuard } from './guard'
import { routes } from './routes'
import { parseQuery, stringifyQuery } from './utils/query'

export const AppRouter = createRouter({
  history: createWebHistory(),
  routes,
  strict: true,
  stringifyQuery,
  parseQuery,
})

export function setupRouter(app: App) {
  app.use(AppRouter)
  createRouterGuard(AppRouter)
  // turbo-console-disable-next-line
  console.info('Router', 'Router Initializing...')
}

export function useAppRoute() {
  return useRoute()
}

export function useAppRouter() {
  if (!getCurrentInstance()) {
    return AppRouter
  }

  return useRouter()
}

export function useAppRouterPush(info: RouteLocationRaw) {
  try {
    return AppRouter.push(info).catch(() => {
      // maybe error
      useAppMessage().warning(AppI18n().global.t('app.menu.error'))

      // finish the loadingbar
      window.$loadingBar.finish()
    })
  }
  catch (error) {
    // turbo-console-disable-next-line
    console.error('Router push', error)

    // maybe error
    useAppMessage().warning(AppI18n().global.t('app.menu.error'))
  }
}
