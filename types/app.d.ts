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

    title?: string

    icon?: string

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

    /* permission string */
    permission?: string

    createdAt?: Date
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

  interface AppRole {
    _id?: string
    roleName?: string
    description?: string
    order?: number
    menus?: string[]
    status?: boolean
    createdAt?: Date
    updatedAt?: Date
  }

  interface AppLang {
    _id?: string
    lang?: string
    description?: string
    order?: number
    status?: boolean
    createdAt?: Date
    updatedAt?: Date
  }

  interface AppLocale {
    _id?: string
    langId?: string
    key?: string
    value?: string
    createdAt?: Date
    updatedAt?: Date
  }
}

export {}
