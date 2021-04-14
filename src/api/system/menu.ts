import { BaseAPI } from '../base'

const menuAPI = new BaseAPI({ model: 'system', section: 'menu' })

export const listMenu = (query: any) => menuAPI.list(query)

export const createMenu = (data: any) => menuAPI.create(data)

export const readMenu = (data: any) => menuAPI.read(data)

export const updateMenu = (data: any) => menuAPI.update(data)

export const deleteMenu = (data: any) => menuAPI.delete(data)
