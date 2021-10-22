export const useTabsContextMenu = () => {
  const x = ref(0)
  const y = ref(0)

  const targetTab = ref()
  const targetTabIndex = ref(0)
  const ctxMenuVisible = ref(false)

  const onOpenCtxMenu = (event: MouseEvent, tab: AppTab, index: number) => {
    // set ctx positionF
    x.value = event.clientX
    y.value = event.clientY

    // set target tab
    targetTab.value = tab
    targetTabIndex.value = index

    ctxMenuVisible.value = true
  }
  const onCloseCtxMenu = () => {
    ctxMenuVisible.value = false
  }

  return {
    x,
    y,
    targetTab,
    targetTabIndex,
    ctxMenuVisible,
    onOpenCtxMenu,
    onCloseCtxMenu,
  }
}
