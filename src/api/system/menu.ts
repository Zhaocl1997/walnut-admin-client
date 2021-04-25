import type { Menu } from '/@/router/types'
import { BaseAPI } from '../base'

export const menuAPI = new BaseAPI<Menu>({ model: 'system', section: 'menu' })
