import type {} from './vue-router'

declare global {
  interface AppMenu {
    /* id */
    _id?: string

    /* parent id */
    pid?: string

    /* menu type */
    type?: ValueOfMenuTypeConst

    /* route path field */
    path?: string

    /* route name field */
    name?: string

    /* route component file uri */
    component?: any

    /* route meta title */
    title?: string

    /* route meta icon */
    icon?: string

    /* menu displat order */
    order?: number

    /* external/internal/none status */
    ternal?: ValueOfMenuTernalConst

    /* external/internal url */
    url?: string

    /* display in the aside menu */
    show?: boolean

    /* keep alive */
    cache?: boolean

    /* disabled, won't be able to get from backend */
    status?: boolean

    /* affix menu, for tab use */
    affix?: boolean

    /* created at */
    createdAt?: Date

    /* updated at */
    updatedAt?: Date
  }

  interface AppTab {
    name: string
    path: string
    meta: {
      title?: string
      icon?: string
      cache?: boolean
      affix?: boolean
      url?: string
      type?: ValueOfMenuTypeConst
      component?: string
    }
  }
}

export {}
