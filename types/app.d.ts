import { RouteMeta } from 'vue-router'

declare global {
  interface AppSecretKeysInterface {
    B?: string
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
    query?: Recordable
    params?: Recordable
  }

  // system menu
  interface AppSystemMenu extends BaseAppModel {
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
    badge?: string
    menuActiveName?: string
    menuActiveSameTab?: boolean
  }

  // system role
  interface AppSystemRole extends BaseAppModel {
    roleName?: string
    description?: string
    order?: number
    menus?: string[]
    status?: boolean
  }

  // system user
  interface AppSystemUser extends BaseAppModel {
    userName?: string
    nickName?: string
    age?: number
    gender?: string
    phoneNumber?: string
    emailAddress?: string
    description?: string
    avatar?: string
    status?: boolean
    role?: string[]
  }

  // system lang
  interface AppSystemLang extends BaseAppModel {
    lang?: string
    description?: string
    order?: number
    status?: boolean
  }

  // system locale
  interface AppSystemLocale extends BaseAppModel {
    langId?: string
    key?: string
    value?: string
    process?: number
  }

  // system dict type
  interface AppSystemDictType extends BaseAppModel {
    name?: string
    type?: string
    status?: boolean
    description?: string
  }

  // system dict data
  interface AppSystemDictData extends BaseAppModel {
    typeId?: string
    label?: string
    value?: string
    order?: number
    status?: boolean
    description?: string
    tagType?: 'primary' | 'info' | 'success' | 'warning' | 'error'
  }

  // system operate log
  interface AppSystemLogOperate extends BaseAppModel {
    title?: string
    action?: string
    method?: string
    url?: string
    heepVersion?: string
    statusCode?: number
    requestData?: string
    responseData?: string
    userId?: string
    userName?: string
    ip?: string
    invokingMethod?: string
    operatedAt?: Date
    os?: string
    browser?: string
  }

  // system signin log
  interface AppSystemLogSignin extends BaseAppModel {
    ip?: string
    location?: string
    os?: string
    browser?: string
    userId?: string
    userName?: string
    msg?: string
    success?: boolean
    signinAt?: Date
  }

  // shared area
  interface AppSharedArea {
    code?: string
    name?: string
    pcode?: string
  }
}

export {}
