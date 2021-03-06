import { computed, reactive, ref } from 'vue'

export const useTabsContextMenu = () => {
  const ctxMenuVisible = ref(false)
  const currentTabName = ref('')
  const currentTabIndex = ref(0)

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
    currentTabName.value = name
    currentTabIndex.value = index

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
    currentTabName,
    currentTabIndex,

    getCtxMenuStyle,

    onCtxMenu,
    onCloseCtxMenu,
  }
}
