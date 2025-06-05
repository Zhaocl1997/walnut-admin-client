const authPhone = {
  AUTH_PHONE: '/auth/phone',
  AUTH_EMAIL_TEXT_MESSAGE: '/auth/phone/send',
} as const

/**
 * @description auth with text message
 */
export function authWithPhoneNumberAPI(data: AppPayloadAuth.PhoneNumber) {
  return AppAxios.post<AppPayloadAuth.TokenPayload>({
    url: authPhone.AUTH_PHONE,
    data,
  })
}

/**
 * @description send verify code text message
 */
export function sendAuthTextMsgAPI(data: AppPayloadAuth.PhoneNumber) {
  return AppAxios.post<boolean>({
    url: authPhone.AUTH_EMAIL_TEXT_MESSAGE,
    data,
  })
}
