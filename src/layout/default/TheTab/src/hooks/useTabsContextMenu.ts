import { computed, reactive, ref } from 'vue'

export const useTabsContextMenu = () => {
  const contextMenuVisible = ref(false)
  const currentTabName = ref('')
  const currentTabIndex = ref(0)

  const position = reactive({
    x: 0,
    y: 0,
  })

  const getContextMenuVisible = computed(() => contextMenuVisible.value)

  const getContextMenuStyle = computed<Partial<CSSStyleDeclaration>>(() => {
    return {
      position: 'fixed',
      top: position.y + 'px',
      left: position.x + 'px',
      zIndex: '99999',
      minWidth: '150px',
    }
  })

  const onContextMenu = (event: MouseEvent, name: string, index: number) => {
    // set context menu position
    position.x = event.clientX
    position.y = event.clientY

    // get current tab name and index
    currentTabName.value = name
    currentTabIndex.value = index

    onOpenContextMenu()
  }

  const onOpenContextMenu = () => {
    contextMenuVisible.value = true
  }

  const onCloseContextMenu = () => {
    contextMenuVisible.value = false
  }

  return {
    currentTabName,
    currentTabIndex,

    getContextMenuStyle,
    getContextMenuVisible,

    onContextMenu,
    onOpenContextMenu,
    onCloseContextMenu,
  }
}
