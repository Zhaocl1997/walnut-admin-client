import * as constant from './constant'

export const AppAuthRoute: RouteRecordRaw = {
  name: constant.AppAuthName,
  path: constant.AppAuthPath,
  component: () => import('../views/auth/index.vue'),
  meta: {
    title: 'sys:menu:auth',
  },
}

export const AppRootRoute: RouteRecordRaw = {
  name: constant.AppRootName,
  path: constant.AppRootPath,
  component: () => import('../layout/default'),
  children: [],
}

export const AppRedirectRoute: RouteRecordRaw = {
  name: constant.AppRedirectName,
  path: constant.AppRedirectPath + '/:path(.*)',
  component: () => import('../layout/default/TheRedirect/index.vue'),
}

export const App404Route: RouteRecordRaw = {
  name: constant.App404Name,
  path: constant.App404Path,
  component: () => import('../views/error/404/index.vue'),
}

export const App500Route: RouteRecordRaw = {
  name: constant.App500Name,
  path: constant.App500Path,
  component: () => import('../views/error/500/index.vue'),
}

export const routes: RouteRecordRaw[] = [
  AppAuthRoute,
  AppRootRoute,
  AppRedirectRoute,
  App500Route,
]
