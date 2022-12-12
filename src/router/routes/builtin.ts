import * as constant from '../constant'

export const AppAuthRoute: RouteRecordRaw = {
  name: constant.AppAuthName,
  path: constant.AppAuthPath,
  component: () => import('../../views/auth/index.vue'),
  meta: {
    title: 'sys.menu.auth',
  },
}

export const AppAuthPrivacyPolicyRoute: RouteRecordRaw = {
  name: constant.AppAuthPrivacyPolicyName,
  path: constant.AppAuthPrivacyPolicyPath,
  component: () => import('../../views/auth/privacy-policy.vue'),
  meta: {
    title: 'form.app.auth.pp',
  },
}

export const AppAuthServiceAgreementRoute: RouteRecordRaw = {
  name: constant.AppAuthServiceAgreementName,
  path: constant.AppAuthServiceAgreementPath,
  component: () => import('../../views/auth/service-agreement.vue'),
  meta: {
    title: 'form.app.auth.sa',
  },
}

export const AppRootRoute: RouteRecordRaw = {
  name: constant.AppRootName,
  path: constant.AppRootPath,
  component: () => import('../../layout/default'),
  children: [],
}

export const AppRedirectRoute: RouteRecordRaw = {
  name: constant.AppRedirectName,
  path: constant.AppRedirectPath + '/:path(.*)',
  component: () => import('../../layout/default/TheRedirect/index.vue'),
}

// this is added dynamically base on the app setting
export const AppLockRoute: RouteRecordRaw = {
  name: constant.AppLockName,
  path: constant.AppLockPath,
  component: () => import('../../components/App/AppLock/lock.vue'),
  meta: {
    title: 'sys.menu.lock',
  },
}

// this is added when current user routes loaded finished
export const App404Route: RouteRecordRaw = {
  name: constant.App404Name,
  path: constant.App404Path,
  component: () => import('../../views/error/404/index.vue'),
}

export const App500Route: RouteRecordRaw = {
  name: constant.App500Name,
  path: constant.App500Path,
  component: () => import('../../views/error/500/index.vue'),
}

export const builtinRoutes: RouteRecordRaw[] = [
  AppAuthRoute,
  AppAuthPrivacyPolicyRoute,
  AppAuthServiceAgreementRoute,
  AppRootRoute,
  AppRedirectRoute,
  App500Route,
]
