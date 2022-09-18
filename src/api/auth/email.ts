enum EmailEnum {
  AUTH_EMAIL = '/auth/email',
  AUTH_EMAIL_SEND = '/auth/email/send',
}

/**
 * @description auth with email
 */
export const authWithEmail = (data: AppAuth.EmailAddress) => {
  return AppAxios.post<AppAuth.TokenPayload>({
    url: EmailEnum.AUTH_EMAIL,
    data,
  })
}

/**
 * @description send verify code email
 */
export const sendAuthEmail = (data: AppAuth.EmailAddress) => {
  return AppAxios.post<boolean>({
    url: EmailEnum.AUTH_EMAIL_SEND,
    data,
  })
}
