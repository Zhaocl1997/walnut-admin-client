export interface Menu {
  /* id */
  _id?: string

  /* parent id */
  pid?: string

  /* menu type */
  type?: 'catalog' | 'menu' | 'element'

  /* route path field */
  path?: string

  /* route name field */
  name?: string | symbol | undefined

  /* route component file uri */
  component?: any

  /* route meta title */
  title?: string

  /* route meta icon */
  icon?: string

  /* menu displat order */
  order?: number

  /* external/internal/none status */
  ternal?: 'none' | 'external' | 'internal'

  /* external/internal url */
  url?: string

  /* weather to display in the aside menu */
  show?: boolean

  /* weather to cache */
  cache?: boolean

  /* weather disabled */
  status?: boolean

  /* created at */
  createdAt?: Date

  /* updated at */
  updatedAt?: Date
}
