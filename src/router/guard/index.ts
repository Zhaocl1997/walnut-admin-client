import { createAfterEachGuard } from './afterEach'
import { createBeforeEachGuard } from './beforeEach'
import { createBeforeResolveGuard } from './beforeResolve'

export function createRouterGuard(router: Router) {
  createBeforeEachGuard(router)
  createBeforeResolveGuard(router)
  createAfterEachGuard(router)
}
