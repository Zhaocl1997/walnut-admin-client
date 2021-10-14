import type { App } from 'vue'
import type { RouteLocationRaw, RouteRecordRaw } from 'vue-router'

import { createRouter, createWebHistory } from 'vue-router'

import { isInSetup } from '../utils/shared'
import {
  AuthRoute,
  RootRoute,
  redirectRoute,
  NetworkErrorRoute,
} from './constant'
import { createRouterGuard } from './guard'

const routes: RouteRecordRaw[] = [
  AuthRoute,
  RootRoute,
  redirectRoute,
  NetworkErrorRoute,
]

export const AppRouter = createRouter({
  history: createWebHistory(),
  routes,
  strict: true,
})

export const setupRouter = (app: App) => {
  app.use(AppRouter)
  createRouterGuard(AppRouter)
}

export const useAppRoute = () => {
  isInSetup()
  return useRoute()
}

export const useAppRouter = () => {
  isInSetup()
  return useRouter()
}

export const useRouterPush = (info: RouteLocationRaw) => {
  return AppRouter.push(info).catch(() => {
    // maybe error
    useAppMessage().warning(AppI18n.global.t('system.menu.error'))

    // finish the loadingbar
    window.$loadingBar.finish()
  })
}
