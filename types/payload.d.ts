declare global {
  namespace AppPayloadAuth {
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

    interface TokenPayload {
      accessToken: string
      refreshToken: string
    }
  }

  namespace AppPayloadSetting {
    interface AuthSetting {
      account: number
      email: number
      phone: number
      qrcode: number
      gitee: number
      github: number
      weibo: number
      qq: number
      alipay: number
      wechat: number
    }
  }
}

export {}
