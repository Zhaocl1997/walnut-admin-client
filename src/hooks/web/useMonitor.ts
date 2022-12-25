import { AppSocketEvents } from '@/socket/events'

export const onSocketStateHandle = (data: Partial<AppMonitorUserModel>) => {
  if (!fpId.value)
    return

  AppSocket.emit(AppSocketEvents.STATE, Object.assign(data, {
    visitorId: fpId.value,
  }))
}

const onInitialStateWithSendBeacon = () => {
  const { httpUrl } = useAppEnv('proxy')
  const userProfile = useAppStoreUserProfile()

  const blob = new Blob(
    [
      JSON.stringify({
        visitorId: fpId.value,
        ip: userProfile.info.ip,
        // @ts-expect-error
        netType: navigator.connection.effectiveType,
        // @ts-expect-error
        platform: navigator.userAgentData.platform,
        vp: `${window.innerWidth} * ${window.innerHeight}`,
        sr: `${window.screen.height} * ${window.screen.width}`,
      }),
    ],
    { type: 'application/json; charset=UTF-8' },
  )

  navigator.sendBeacon(`${httpUrl}/app/monitor/user/initial`, blob)
}

export const useAppMonitor = () => {
  const isVisible = useSharedDocumentVisibility()

  watch(
    () => AppRouter.currentRoute.value,
    (v) => {
      onSocketStateHandle({
        currentRouter: v.fullPath,
      })
    },
    {
      immediate: true,
      deep: true,
    },
  )

  // hidden
  watch(
    () => isVisible.value,
    (v) => {
      onSocketStateHandle({
        focus: v,
      })
    },
    {
      flush: 'post',
    },
  )

  tryOnMounted(() => {
    onInitialStateWithSendBeacon()

    onSocketStateHandle({ focus: true, left: false })
  })
}
