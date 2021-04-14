import type { RouteRecordRaw } from 'vue-router'
import { t } from '/@/locales/utils'

export const authPath = '/auth'
export const authName = 'Auth'

export const rootPath = '/'
export const rootName = 'Layout'

export const indexPath = '/index'
export const indexName = 'Index'

export const redirectPath = '/redirect'
export const redirectName = 'Redirect'

export const notFoundPath = '/:path(.*)*'
export const notFoundName = '404'

export const AuthRoute: RouteRecordRaw = {
  name: authName,
  path: authPath,
  component: () => import('../views/auth/index.vue'),
  meta: {
    title: t('system.menu.auth'),
  },
}

export const RootRoute: RouteRecordRaw = {
  name: rootName,
  path: rootPath,
  component: () => import('../layout/default'),
  children: [
    {
      path: indexPath,
      name: indexName,
      component: () => import('../views/index/index.vue'),
      meta: {
        title: t('system.menu.index'),
        affix: true,
      },
    },
  ],
}

export const redirectRoute: RouteRecordRaw = {
  name: redirectName,
  path: redirectPath + '/:path(.*)',
  component: () => import('../layout/default/TheRedirect/index.vue'),
}

export const notFoundRoute: RouteRecordRaw = {
  name: notFoundName,
  path: notFoundPath,
  component: () => import('../views/error/404/index.vue'),
}
