import type { RouteMeta } from 'vue-router'

export interface AppTab {
  name: string
  path: string
  meta: RouteMeta
}
