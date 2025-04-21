import { createAfterEachGuard } from './afterEach'
import { createBeforeEachGuard } from './beforeEach'

export function createRouterGuard(router: Router) {
  createBeforeEachGuard(router)
  createAfterEachGuard(router)
}
