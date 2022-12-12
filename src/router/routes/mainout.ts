import * as constant from '../constant'

export const testMainoutRoute: RouteRecordRaw = {
  name: constant.AppTestMainoutName,
  path: constant.AppTestMainoutPath,
  component: () => import('../../views/features/test-mainout.vue'),
  meta: {
    _auth: false,
  },
}

export const externalLinkRoute: RouteRecordRaw = {
  name: constant.AppOpenExternalName,
  path: constant.AppOpenExternalPath,
  component: () => import('../../views/features/external-link.vue'),
  meta: {
    _auth: false,
  },
}

export const mainoutRoutes: RouteRecordRaw[] = [
  testMainoutRoute,
  externalLinkRoute,
]
