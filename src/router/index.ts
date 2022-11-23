import { createRouter, createWebHistory } from 'vue-router'

import { routes } from './routes'
import { createRouterGuard } from './guard'
import { stringifyQuery, parseQuery } from './utils/query'

export const AppRouter = createRouter({
  history: createWebHistory(),
  routes,
  strict: true,
  stringifyQuery: stringifyQuery,
  parseQuery: parseQuery,
})

export const setupRouter = (app: App) => {
  app.use(AppRouter)
  createRouterGuard(AppRouter)
  AppInfo('Router Initializing...')
}

export const useAppRoute = () => {
  isInSetup()
  return useRoute()
}

export const useAppRouter = () => {
  isInSetup()
  return useRouter()
}

export const useAppRouterPush = (info: RouteLocationRaw) => {
  return AppRouter.push(info).catch(() => {
    // maybe error
    useAppMessage().warning(AppI18n.global.t('app.menu.error'))

    // finish the loadingbar
    window.$loadingBar.finish()
  })
}
