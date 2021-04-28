import type { App } from 'vue'
import type { RouteLocationRaw, RouteRecordRaw } from 'vue-router'

import { done } from 'nprogress'
import { createRouter, createWebHistory, useRoute, useRouter } from 'vue-router'

import { isInSetup } from '../utils/shared'
import {
  AuthRoute,
  RootRoute,
  redirectRoute,
  NetworkErrorRoute,
} from './constant'
import { createRouterGuard } from './guard'
import { ElMessage } from 'element-plus'

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
    ElMessage({ type: 'warning', message: 'Page is under construction...' })
    // end nprogress
    done()
  })
}
