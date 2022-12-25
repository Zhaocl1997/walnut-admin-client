import { createAuthGuard } from './authGuard'
import { createProgressGuard } from './progressGuard'

export const createRouterGuard = (router: Router) => {
  createAuthGuard(router)
  createProgressGuard(router)
}
