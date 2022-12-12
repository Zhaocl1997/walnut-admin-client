import * as constant from '../constant'

export const testRoute: RouteRecordRaw = {
  name: constant.AppTestMainoutName,
  path: constant.AppTestMainoutPath,
  component: () => import('../../views/demo/mainout.vue'),
}

export const mainoutRoutes: RouteRecordRaw[] = [testRoute]
