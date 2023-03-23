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

export const testFrontAuthRoute: RouteRecordRaw = {
  name: constant.AppTestFrontAuthName,
  path: constant.AppTestFrontAuthPath,
  component: () => import('../../views/features/test-frontAuth.vue'),
  meta: {
    _auth: true,
  },
}

export const mainoutRoutes: RouteRecordRaw[] = [
  testMainoutRoute,
  externalLinkRoute,
  testFrontAuthRoute,
]
