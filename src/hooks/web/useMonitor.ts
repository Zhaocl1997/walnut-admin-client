interface sendBeaconData {
  focus?: boolean
  left?: boolean
  currentRouter?: string
}

export const sendBeacon = (data: sendBeaconData) => {
  const userProfile = useAppStoreUserProfile()
  const userAuth = useAppStoreUserAuth()

  const blob = new Blob(
    [
      JSON.stringify({
        fp: fpId.value,
        ...data,
        auth: !!userAuth.accessToken,
        location: wbtoa(userProfile.cityName),
        userId: userProfile?.profile?._id,
        userName: userProfile?.profile?.userName,
      }),
    ],
    { type: 'application/json; charset=UTF-8' }
  )

  navigator.sendBeacon(`${realAPIURL}/app/monitor/user`, blob)
}

export const useAppMonitor = () => {
  const visibility = useDocumentVisibility()

  // hidden
  const stopVisibleWatch = watch(
    () => visibility.value,
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
