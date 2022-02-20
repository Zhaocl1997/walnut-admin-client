import { RouteMeta } from 'vue-router'

declare global {
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
    query?: Recordable
    params: Recordable
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

  // dict type
  interface AppDictType extends BaseAppModel {
    name?: string
    type?: string
    status?: boolean
    description?: string
  }

  // dict data
  interface AppDictData extends BaseAppModel {
    typeId?: string
    label?: string
    value?: string
    order?: number
    status?: boolean
    description?: string
  }
}

export {}
