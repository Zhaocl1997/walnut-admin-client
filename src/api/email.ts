enum EmailEnum {
  SIGNUP_EMAIL = '/auth/signup/email/send',
}

/**
 * @description send verify code to signup email
 */
export const sendSignupEmail = (data: AppAuth.EmailAddress) => {
  return AppAxios.post<boolean>({
    url: EmailEnum.SIGNUP_EMAIL,
    data,
  })
}
