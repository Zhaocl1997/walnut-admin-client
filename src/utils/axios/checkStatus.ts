import { userActionSignOut } from '/@/store/actions/user'

let notiInst: any = undefined

const responseError = (msg: string) => {
  if (notiInst) {
    return
  }

  notiInst = useAppNotification().error({ title: msg, duration: 10000 })
}

export const checkReponseErrorStatus = (status?: number, msg?: string) => {
  const { t } = AppI18n.global

  switch (status) {
    case 400:
      responseError(`${msg}`)
      break

    // 401: unauthorized
    case 401:
      responseError(t('sys:ajax:401'))
      userActionSignOut()
      break

    case 403:
      responseError(t('sys:ajax:403'))
      break

    // 404 not found
    case 404:
      responseError(t('sys:ajax:404'))
      break

    case 405:
      responseError(t('sys:ajax:405'))
      break

    case 408:
      responseError(t('sys:ajax:408'))
      break

    case 500:
      responseError(t('sys:ajax:500'))
      break

    case 501:
      responseError(t('sys:ajax:501'))
      break

    case 502:
      responseError(t('sys:ajax:502'))
      break

    case 503:
      responseError(t('sys:ajax:503'))
      break

    case 504:
      responseError(t('sys:ajax:504'))
      break

    case 505:
      responseError(t('sys:ajax:505'))
      break

    default:
      responseError(t('sys:ajax:502'))
      break
  }
}
