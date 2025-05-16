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
    ternal?: ValueOfAppConstMenuTernal

    /**
     * @description this is an option that only works for routes hard-coded in front-end code
     * for those routes that do not need to fetch permissions from backend
     */
    _auth?: boolean
  }
}
