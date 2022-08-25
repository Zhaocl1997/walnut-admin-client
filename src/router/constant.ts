export const AppAuthPath = '/auth'
export const AppAuthName = 'Auth'

export const AppAuthPrivacyPolicyPath = '/auth/privacy-policy'
export const AppAuthPrivacyPolicyName = 'PrivacyPolicy'

export const AppAuthServiceAgreementPath = '/auth/service-agreement'
export const AppAuthServiceAgreementName = 'ServiceAgreement'

export const AppRootPath = '/'
export const AppRootName = 'Layout'

export const AppRedirectPath = '/redirect'
export const AppRedirectName = 'Redirect'

export const AppLockPath = '/lock'
export const AppLockName = 'Lock'

export const App404Path = '/:path(.*)*'
export const App404Name = '404'

export const App403Path = '/403'
export const App403Name = '403'

export const App500Path = '/500'
export const App500Name = '500'

/**
 * @description public route that enter directly
 */
export const RouteWhiteLists: string[] = [
  AppAuthPath,
  AppAuthPrivacyPolicyPath,
  AppAuthServiceAgreementPath,
]
