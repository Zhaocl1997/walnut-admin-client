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
  console.info('Router', 'Router Initializing...')
}

export function useAppRoute() {
  isInSetup()
  return useRoute()
}

export function useAppRouter() {
  isInSetup()
  return useRouter()
}

export function useAppRouterPush(info: RouteLocationRaw) {
  try {
    return AppRouter.push(info).catch(() => {
      // maybe error
      useAppMessage().warning(AppI18n.global.t('app.menu.error'))

      // finish the loadingbar
      window.$loadingBar.finish()
    })
  }
  catch (error) {
    console.error('Router push', error)

    // maybe error
    useAppMessage().warning(AppI18n.global.t('app.menu.error'))
  }
}
