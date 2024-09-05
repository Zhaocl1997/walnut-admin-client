import { createBeforeEachGuard } from './beforeEach'
import { createAfterEachGuard } from './afterEach'

export function createRouterGuard(router: Router) {
  createBeforeEachGuard(router)
  createAfterEachGuard(router)
}
