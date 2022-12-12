import { builtinRoutes } from './builtin'
import { mainoutRoutes } from './mainout'

export const routes: RouteRecordRaw[] = [...builtinRoutes, ...mainoutRoutes]
