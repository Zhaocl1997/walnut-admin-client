export const useTabsContextMenu = () => {
  const { tab } = useAppState()

  const x = ref(0)
  const y = ref(0)

  const ctxMenuShow = ref(false)

  const onOpenCtxMenu = (event: MouseEvent, payload: AppTab, index: number) => {
    // set ctx position
    x.value = event.clientX
    y.value = event.clientY

    // set target tab and index
    tab.value.targetTab = payload
    tab.value.targetTabIndex = index

    ctxMenuShow.value = true
  }
  const onCloseCtxMenu = () => {
    ctxMenuShow.value = false
  }

  return {
    x,
    y,

    ctxMenuShow,
    onOpenCtxMenu,
    onCloseCtxMenu,
  }
}
