export {}

declare module 'vue-router' {
  interface RouteMeta {
    title?: string
    icon?: string
    cache?: boolean
    affix?: boolean
    url?: string
    type?: ValueOfMenuTypeConst
    component?: string
    badge?: string
    menuActiveName?: string
    menuActiveSameTab?: boolean
  }
}
