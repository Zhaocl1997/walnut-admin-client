import type { Recordable } from 'easy-fns-ts'
import type { RouteMeta } from 'vue-router'

declare global {
  interface AppSecretKeysInterface {
    B?: string
  }

  /**
   * @description app base database schema model
   */
  interface AppBaseModel {
    _id?: string
    createdAt?: Date
    updatedAt?: Date
  }

  /**
   * @description app tab meta extend fields
   */
  interface AppTabMetaExtend {
    /**
     * @description tab hover state, manually managed
     */
    _hovered?: boolean

    /**
     * @description whether confirmed leave already, used to fixed the `tab-close-self` and `route-guard` conflict with each other
     */
    _confirm_leave?: boolean

    /**
     * @description this is a hack for the changed title
     * first try to render this, normally undefined
     * then try to render title
     * used for dynamic tab title
     */
    _title?: string

    /**
     * @description _title scroll speed
     */
    _title_speed?: number

    /**
     * @description max length to scroll
     * default is 10
     */
    _title_maxLength?: number

    /**
     * @description this is a hack for the changed icon
     * first try to render this, normally undefined
     * then try to render icon
     * used for dynamic tab icon
     */
    _icon?: string

    /**
     * @description _icon animate type
     */
    _icon_animate?: boolean

    /**
     * @description _icon animate speed
     */
    _icon_animate_duration?: 1000 | 2000 | 3000 | 4000
  }

  interface AppTabExtendTitleOptions {
    timeout?: number
    speed?: number
    maxLength?: number
  }

  interface AppTabExtendIconOptions {
    timeout?: number
    animate?: boolean
    duration?: 1000 | 2000 | 3000 | 4000
  }

  type AppTabMeta = RouteMeta & AppTabMetaExtend

  // tab
  // almost same as RouteRecord
  interface AppTab {
    name: string
    path: string
    meta: AppTabMeta
    query?: Recordable
    params?: Recordable
  }

  // system menu meta
  interface AppSystemMenuMeta {
    order?: number
    ternal?: ValueOfAppConstMenuTernal
    url?: string
    show?: boolean
    cache?: boolean
    status?: boolean
    affix?: boolean
    permission?: string
    badge?: string
    menuActiveName?: string
    menuActiveSameTab?: boolean
    animationName?: string
    activeIcon?: string
    position?: boolean
    leaveTip?: boolean
  }

  // system menu
  interface AppSystemMenu extends AppBaseModel {
    pid?: string
    type?: ValueOfAppConstMenuType
    path?: string
    name?: string
    component?: string | PromiseFn
    title?: string
    icon?: string

    meta: AppSystemMenuMeta
  }

  // system role
  interface AppSystemRole extends AppBaseModel {
    roleName?: string
    description?: string
    order?: number
    menus?: string[]
    status?: boolean
  }

  // system user
  interface AppSystemUser extends AppBaseModel {
    userName?: string
    nickName?: string
    age?: number
    gender?: string
    phoneNumber?: string
    emailAddress?: string
    description?: string
    avatar?: string
    status?: boolean
    roles?: string[]
    roleMode?: 'switchable' | 'combinable'
    currentRole?: string

    populated_rolesList?: AppSystemRole[]
  }

  // system device
  interface AppSystemDevice extends AppBaseModel {
    deviceName?: string
    deviceId?: string
    deviceInfo?: {
      os?: string
      browser?: string
      type?: string
      netType?: string
      platform?: string
      isp?: string
    }
    hardwareInfo?: {
      cpuCores?: number
      memory?: number
      gpu?: string
    }
    sr?: {
      height: number
      width: number
    }
    vp?: {
      height: number
      width: number
    }
    ipHistory?: string[]
    active?: boolean
    locked?: boolean
    riskScore?: number
    geoLocation?: {
      type: 'Point'
      coordinates: [number, number]
    }
    locationInfo?: {
      country?: string
      province?: string
      city?: string
      area?: string
    }
  }

  // system lang
  interface AppSystemLang extends AppBaseModel {
    lang?: string
    description?: string
    order?: number
    status?: boolean

    // translate process, calculated in backend
    process?: number
  }

  // system locale
  interface AppSystemLocale extends AppBaseModel {
    langId?: string
    key?: string
    value?: string
    process?: number
    oldKey?: string
  }

  // system dict type
  interface AppSystemDictType extends AppBaseModel {
    name?: string
    type?: string
    status?: boolean
    description?: string
  }

  // system dict data
  interface AppSystemDictData extends AppBaseModel {
    typeId?: string
    label?: string
    value?: string
    order?: number
    status?: boolean
    description?: string
    tagType?: 'primary' | 'info' | 'success' | 'warning' | 'error'
  }

  // system operate log
  interface AppSystemLogOperate extends AppBaseModel {
    title?: string
    actionType?: string
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
    operatedAt?: Date | string | [string, string]
    os?: string
    browser?: string
    success?: boolean
    location?: string
    correspondingMS?: number
  }

  // system signin log
  interface AppSystemLogAuth extends AppBaseModel {
    ip?: string
    location?: string
    os?: string
    browser?: string
    userId?: string
    userName?: string
    msg?: string
    success?: boolean
    authTime?: Date
  }

  // system delete
  interface AppSystemDeleted extends Omit<AppBaseModel, 'updatedAt'> {
    content?: string
    modelName?: string
    collectionName?: string
    deletedId?: string
    deletedAt?: Date
    deletedBy?: string
    logOperateId?: string

    populated_user?: AppSystemUser
  }

  // shared area
  interface AppSharedArea {
    code?: string
    name?: string
    pcode?: string
  }

  // app setting
  interface AppSettingsModel extends AppBaseModel {
    settingName?: string
    settingKey?: string
    settingValue?: string
    remark?: string
  }

  // app monitor cache model
  interface AppMonitorCacheModel extends AppBaseModel {
    key?: string
    value?: string
    type?: 'built-in' | 'auth-permissions' | 'verify-code' | 'controller' | 'shared-area' | 'sys-locale-messages' | 'sys-lang-id-list' | 'sys-device-id-list'
    valueBytes?: string
    expire?: string
    startTime?: string
    expireTime?: string
  }

  // app monitor user model
  interface AppMonitorUserModel extends Omit<AppBaseModel, 'createdAt' | 'updatedAt'> {
    visitorId: string
    userId?: string | null
    deviceId?: string

    auth: boolean
    focus: boolean
    left: boolean
    currentRouter: string

    firstVisitAt?: Date
    lastActiveAt?: Date

    populated_device?: AppSystemDevice
    populated_user?: AppSystemUser
  }
}
