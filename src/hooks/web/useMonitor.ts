interface sendBeaconData {
  focus?: boolean
  left?: boolean
  currentRouter?: string
}

const { httpUrl } = useAppEnv('proxy')

export const sendBeacon = (data: sendBeaconData) => {
  if (!fpId.value) return

  const userProfile = useAppStoreUserProfile()
  const userAuth = useAppStoreUserAuth()

  const blob = new Blob(
    [
      JSON.stringify({
        visitorId: fpId.value,
        ...data,
        auth: !!userAuth.accessToken,
        location: wbtoa(userProfile.cityName),
        userId: userProfile?.profile?._id,
        userName: userProfile?.profile?.userName,
      }),
    ],
    { type: 'application/json; charset=UTF-8' }
  )

  navigator.sendBeacon(`${httpUrl}/app/monitor/user`, blob)
}

export const useAppMonitor = () => {
  // hidden
  const stopVisibleWatch = watch(
    () => appDocumentVisibility.value,
    (v) => {
      sendBeacon({
        focus: v === 'visible',
        left: false,
      })
    },
    {
      flush: 'post',
    }
  )

  // leave
  useEventListener(
    'beforeunload',
    () => {
      stopVisibleWatch()

      sendBeacon({ focus: false, left: true })
    },
    false
  )

  // initial
  tryOnMounted(() => {
    sendBeacon({ focus: true, left: false })
  })
}
