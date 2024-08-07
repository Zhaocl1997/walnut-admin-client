enum EmailEnum {
  AUTH_EMAIL = '/auth/email',
  AUTH_EMAIL_SEND = '/auth/email/send',
}

/**
 * @description auth with email
 */
export function authWithEmail(data: AppPayloadAuth.EmailAddress) {
  return AppAxios.post<AppPayloadAuth.TokenPayload>({
    url: EmailEnum.AUTH_EMAIL,
    data,
  })
}

/**
 * @description send verify code email
 */
export function sendAuthEmail(data: AppPayloadAuth.EmailAddress) {
  return AppAxios.post<boolean>({
    url: EmailEnum.AUTH_EMAIL_SEND,
    data,
  })
}
