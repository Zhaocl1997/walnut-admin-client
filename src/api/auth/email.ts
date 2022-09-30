enum EmailEnum {
  AUTH_EMAIL = '/auth/email',
  AUTH_EMAIL_SEND = '/auth/email/send',
}

/**
 * @description auth with email
 */
export const authWithEmail = (data: AppPayloadAuth.EmailAddress) => {
  return AppAxios.post<AppPayloadAuth.TokenPayload>({
    url: EmailEnum.AUTH_EMAIL,
    data,
  })
}

/**
 * @description send verify code email
 */
export const sendAuthEmail = (data: AppPayloadAuth.EmailAddress) => {
  return AppAxios.post<boolean>({
    url: EmailEnum.AUTH_EMAIL_SEND,
    data,
  })
}
