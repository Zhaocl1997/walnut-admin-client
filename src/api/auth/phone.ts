enum PhoneEnum {
  AUTH_PHONE = '/auth/phone',
  AUTH_EMAIL_TEXT_MESSAGE = '/auth/phone/send',
}

/**
 * @description auth with text message
 */
export const authWithPhoneNumber = (data: AppAuth.PhoneNumber) => {
  return AppAxios.post<AppAuth.TokenPayload>({
    url: PhoneEnum.AUTH_PHONE,
    data,
  })
}

/**
 * @description send verify code text message
 */
export const sendAuthTextMsg = (data: AppAuth.PhoneNumber) => {
  return AppAxios.post<boolean>({
    url: PhoneEnum.AUTH_EMAIL_TEXT_MESSAGE,
    data,
  })
}