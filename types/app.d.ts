import { RouteMeta } from 'vue-router'

declare global {
  interface AppThemeColors {
    primaryColor: string
    infoColor: string
    warningColor: string
    errorColor: string
    bodyColor: string
  }

  interface AppTheme {
    light: AppThemeColors
    dark: AppThemeColors
  }

  interface BaseAppModel {
    _id?: string

    /**
     * @deprecated
     */
    deleted?: boolean

    createdAt?: Date
    updatedAt?: Date
  }

  // tab
  // almost same as RouteRecord
  interface AppTab {
    name: string
    path: string
    meta: RouteMeta
  }

  // menu
  interface AppMenu extends BaseAppModel {
    pid?: string
    type?: ValueOfMenuTypeConst
    path?: string
    name?: string
    component?: any
    title?: string
    icon?: string
    order?: number
    ternal?: ValueOfMenuTernalConst
    url?: string
    show?: boolean
    cache?: boolean
    status?: boolean
    affix?: boolean
    permission?: string
  }

  // role
  interface AppRole extends BaseAppModel {
    roleName?: string
    description?: string
    order?: number
    menus?: string[]
    status?: boolean
  }

  // user
  interface AppUser extends BaseAppModel {
    username?: string
    nickname?: string
    age?: number
    sex?: string
    avatar?: string
    status?: boolean
    role?: string[]
  }

  // lang
  interface AppLang extends BaseAppModel {
    lang?: string
    description?: string
    order?: number
    status?: boolean
  }

  // locale
  interface AppLocale extends BaseAppModel {
    langId?: string
    key?: string
    value?: string
    process?: number
  }
}

export {}
