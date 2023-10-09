export function onSocketStateHandle(data: Partial<AppMonitorUserModel>) {
  if (!fpId.value)
    return

  AppSocket?.emit(AppSocketEvents.STATE, Object.assign(data, {
    visitorId: fpId.value,
  }))
}

function onInitialStateWithSendBeacon() {
  const { httpUrl } = useAppEnv('proxy')
  const userAuth = useAppStoreUserAuth()

  const blob = new Blob(
    [
      JSON.stringify({
        visitorId: fpId.value,
        ip: UAInfo.value.ip,
        country: UAInfo.value.country,
        city: UAInfo.value.city,
        area: UAInfo.value.area,
        isp: UAInfo.value.isp,
        province: UAInfo.value.province,
        // @ts-expect-error
        netType: navigator.connection.effectiveType,
        platform: navigator.platform,
        vp: `${window.innerWidth} * ${window.innerHeight}`,
        sr: `${window.screen.width} * ${window.screen.height}`,
        auth: !!userAuth.accessToken,
      }),
    ],
    { type: 'application/json; charset=UTF-8' },
  )

  navigator.sendBeacon(`${httpUrl}/app/monitor/user/initial`, blob)
}

export function useAppMonitor() {
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
      immediate: true,
    },
  )

  tryOnMounted(() => {
    onInitialStateWithSendBeacon()

    onSocketStateHandle({ focus: true, left: false })
  })
}
