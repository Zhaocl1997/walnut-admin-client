declare global {
  namespace AppAuth {
    // password payload
    interface Password {
      userName: string
      password: string
      rememberMe?: boolean
    }

    // email address payload
    interface EmailAddress {
      emailAddress: string
      verifyCode: string
    }

    // phone number payload
    interface PhoneNumber {
      phoneNumber: string
      verifyCode: string
    }
  }
}

export {}
