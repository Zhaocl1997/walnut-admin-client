import { userActionSignOut } from '/@/store/actions/user'

let notiInst: any = undefined

const responseError = (msg: string) => {
  if (notiInst) {
    return
  }

  notiInst = useAppNotification().error({ title: msg })
}

export const checkReponseErrorStatus = (status?: number, msg?: string) => {
  const { t } = AppI18n.global

  switch (status) {
    case 400:
      responseError(`${msg}`)
      break

    // 401: unauthorized
    case 401:
      responseError(t('system.api.errMsg401'))
      userActionSignOut()
      break

    case 403:
      responseError(t('system.api.errMsg403'))
      break

    // 404 not found
    case 404:
      responseError(t('system.api.errMsg404'))
      break

    case 405:
      responseError(t('system.api.errMsg405'))
      break

    case 408:
      responseError(t('system.api.errMsg408'))
      break

    case 500:
      responseError(t('system.api.errMsg500'))
      break

    case 501:
      responseError(t('system.api.errMsg501'))
      break

    case 502:
      responseError(t('system.api.errMsg502'))
      break

    case 503:
      responseError(t('system.api.errMsg503'))
      break

    case 504:
      responseError(t('system.api.errMsg504'))
      break

    case 505:
      responseError(t('system.api.errMsg505'))
      break

    default:
      responseError(t('system.api.errMsg502'))
      break
  }
}
