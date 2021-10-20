export const useTabsContextMenu = () => {
  const ctxMenuVisible = ref(false)
  const targetTabName = ref('')
  const targetTabIndex = ref(0)

  const position = reactive({
    x: 0,
    y: 0,
  })

  const getCtxMenuStyle = computed<any>(() => {
    return {
      position: 'fixed',
      top: position.y + 'px',
      left: position.x + 'px',
      zIndex: '9999',
      minWidth: '150px',
    } as CSSStyleDeclaration
  })

  const onCtxMenu = (event: MouseEvent, name: string, index: number) => {
    // set context menu position
    position.x = event.clientX
    position.y = event.clientY

    // get current tab name and index
    targetTabName.value = name
    targetTabIndex.value = index

    onOpenCtxMenu()
  }

  const onOpenCtxMenu = () => {
    ctxMenuVisible.value = true
  }

  const onCloseCtxMenu = () => {
    ctxMenuVisible.value = false
  }

  return {
    ctxMenuVisible,
    targetTabName,
    targetTabIndex,

    getCtxMenuStyle,

    onCtxMenu,
    onCloseCtxMenu,
  }
}
