import { BaseAPI } from '../base'

export const userAPI = new BaseAPI<AppSystemUser>({
  model: 'system',
  section: 'user',
})

/**
 * @description reset password
 */
export function resetPassowrd(data: { userId: string }) {
  return AppAxios.patch<boolean>({
    url: '/system/user/password/reset',
    data,
  })
}

/**
 * @description update password
 */
export function updatePassowrd(data: { userId: string, newPassword: string }) {
  return AppAxios.patch<boolean>({
    url: '/system/user/password/update',
    data,
    _autoEncryptRequestDataFields: ['newPassword'],
  })
}
