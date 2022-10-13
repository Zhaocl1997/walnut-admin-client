import { createAuthGuard } from './authGuard'
import { createBeaconGuard } from './beaconGuard'
import { createProgressGuard } from './progressGuard'

export const createRouterGuard = (router: Router) => {
  createProgressGuard(router)
  createAuthGuard(router)
  createBeaconGuard(router)
}
