import type { Router } from 'vue-router'

import { createAuthGuard } from './authGuard'
import { createProgressGuard } from './progressGuard'

export const createRouterGuard = (router: Router) => {
  createProgressGuard(router)
  createAuthGuard(router)
}
