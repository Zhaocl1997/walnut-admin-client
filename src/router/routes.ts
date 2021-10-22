import * as constant from './constant'

import { t } from '/@/locales/utils'

const { menu } = useAppState()

export const AuthRoute: RouteRecordRaw = {
  name: constant.authName,
  path: constant.authPath,
  component: () => import('../views/auth/index.vue'),
  meta: {
    title: t('system.menu.auth'),
  },
}

export const RootRoute: RouteRecordRaw = {
  name: constant.rootName,
  path: constant.rootPath,
  redirect: { name: menu.indexMenuName },
  component: () => import('../layout/default'),
  children: [],
}

export const redirectRoute: RouteRecordRaw = {
  name: constant.redirectName,
  path: constant.redirectPath + '/:path(.*)',
  component: () => import('../layout/default/TheRedirect/index.vue'),
}

export const notFoundRoute: RouteRecordRaw = {
  name: constant.notFoundName,
  path: constant.notFoundPath,
  component: () => import('../views/error/404/index.vue'),
}

export const NetworkErrorRoute: RouteRecordRaw = {
  name: constant.networkErrorName,
  path: constant.networkErrorPath,
  component: () => import('../views/error/500/index.vue'),
}

export const routes: RouteRecordRaw[] = [
  AuthRoute,
  RootRoute,
  redirectRoute,
  NetworkErrorRoute,
]
