import { createRouter, createWebHistory } from 'vue-router'

import { isInSetup } from '../utils/shared'
import { routes } from './routes'
import { createRouterGuard } from './guard'

export const AppRouter = createRouter({
  history: createWebHistory(),
  routes,
  strict: true,
  // https://github.com/wukang0718/vueRouterEncryption
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
    useAppMessage().warning(AppI18n.global.t('sys:menu:error'))

    // finish the loadingbar
    window.$loadingBar.finish()
  })
}
