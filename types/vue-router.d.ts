export {}

declare module 'vue-router' {
  interface RouteMeta {
    title?: string
    icon?: string
    cache?: boolean
    affix?: boolean
    url?: string
    type?: ValueOfAppConstMenuType
    component?: string
    badge?: string
    menuActiveName?: string
    menuActiveSameTab?: boolean
    animationName?: string
    activeIcon?: string
    position?: boolean
    leaveTip?: boolean

    _top?: number
  }
}
