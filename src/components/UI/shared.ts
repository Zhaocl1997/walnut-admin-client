// default app level locale message key
export const defaultAppLocaleMessageKeys = [
  'id',
  'index',
  'createdAt',
  'updatedAt',

  'title',
  'action',
  'icon',
  'order',
  'status',
  'description',
  'selection',

  'location',
  'country',
  'city',

  'userId',
  'userName',

  'fixed',
  'transition',
  'inverted',
  'sr',
  'vp',

  'ip',
  'isp',

  'os',
  'browser',

  'deviceName',
  'deviceType',
  'platform',
  'netType',

  'scrollUpShow',
  'liveOnHover',
  'lastActiveAt',
  'firstVisitAt',
  'currentRouter',

  'modelName',
  'collectionName',
] as const

export type IDefaultAppLocaleMessage = typeof defaultAppLocaleMessageKeys[number]
