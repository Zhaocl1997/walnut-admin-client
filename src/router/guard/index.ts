import { createAuthGuard } from './authGuard'
import { createBeaconGuard } from './beaconGuard'
import { createProgressGuard } from './progressGuard'

export const createRouterGuard = (router: Router) => {
  createAuthGuard(router)
  createProgressGuard(router)
  createBeaconGuard(router)
}
