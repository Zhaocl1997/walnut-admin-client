import { createAuthGuard } from './authGuard'
import { createBeforeEachGuard } from './beforeEach'
import { createAfterEachGuard } from './afterEach'

export const createRouterGuard = (router: Router) => {
  createBeforeEachGuard(router)
  createAfterEachGuard(router)
}
