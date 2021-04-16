import type { RouteMeta } from 'vue-router'

export * from './tabsContext'

export interface AppTab {
  name: string
  path: string
  meta: RouteMeta
}
