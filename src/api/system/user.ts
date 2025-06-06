import { BaseAPI } from '../base'

export const userAPI = new BaseAPI<AppSystemUser>({
  model: 'system',
  section: 'user',
})

/**
 * @description reset password
 */
export function resetPassowrdAPI(data: { userId: string }) {
  return AppAxios.patch<boolean>({
    url: `/system/user/password/reset/${data.userId}`,
    data,
  })
}

/**
 * @description update password
 */
export function updatePassowrdAPI(data: { userId: string, newPassword: string }) {
  return AppAxios.patch<boolean>({
    url: `/system/user/password/update/${data.userId}`,
    data: {
      newPassword: data.newPassword,
    },
    _autoEncryptRequestDataFields: ['newPassword'],
  })
}

/**
 * @description switch role
 */
export function switchRoleAPI(roleId: string) {
  return AppAxios.patch<boolean>({
    url: `/auth/role/switch/${roleId}`,
  })
}
