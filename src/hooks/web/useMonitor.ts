export const useAppMonitor = () => {
  // TODO optimise
  const visibility = useDocumentVisibility()

  // hidden
  const stopVisibleWatch = watch(
    () => visibility.value,
    (v) => {
      navigator.sendBeacon(
        `${realAPIURL}/app/monitor/user`,
        JSON.stringify({ fp: fpId.value, focus: v === 'visible', left: false })
      )
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

      navigator.sendBeacon(
        `${realAPIURL}/app/monitor/user`,
        JSON.stringify({ fp: fpId.value, focus: false, left: true })
      )
    },
    false
  )

  // initial
  tryOnMounted(() => {
    navigator.sendBeacon(
      `${realAPIURL}/app/monitor/user`,
      JSON.stringify({ fp: fpId.value, focus: true, left: false })
    )
  })
}
