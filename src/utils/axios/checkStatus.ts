function responseError(msg: string) {
  // TODO 93
  useAppNotiError(AppI18n.global?.t(msg))
}

export async function checkReponseErrorStatus(status?: number, msg?: string) {
  switch (status) {
    case 400:
      responseError(`${msg}`)
      break

    // 401: unauthorized
    case 401:
      {
        responseError('app.ajax.401')

        const userAuth = useAppStoreUserAuth()

        await userAuth.Signout()
      }
      break

    case 403:
      responseError('app.ajax.403')
      break

    // 404 not found
    case 404:
      responseError('app.ajax.404')
      break

    case 405:
      responseError('app.ajax.405')
      break

    case 408:
      responseError('app.ajax.408')
      break

    case 500:
      responseError('app.ajax.500')
      break

    case 501:
      responseError('app.ajax.501')
      break

    case 502:
      responseError('app.ajax.502')
      break

    case 503:
      responseError('app.ajax.503')
      break

    case 504:
      responseError('app.ajax.504')
      break

    case 505:
      responseError('app.ajax.505')
      break

    default:
      responseError('app.ajax.502')
      break
  }
}
