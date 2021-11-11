import projectPath from '../../../../../../build/projectPath'

export const useTabsDevTools = () => {
  const currentMouseTab = ref<AppTab>()
  const devToolShow = ref(false)
  const timeoutId = ref<NodeJS.Timeout>()
  const devToolX = ref(0)
  const devToolY = ref(0)

  const onOpenFile = () => {
    const filePath = currentMouseTab.value?.meta.component
    window.open(`vscode://file/${projectPath}/${filePath}.vue`)
    devToolShow.value = false
  }

  const onOpenDevTool = (
    event: MouseEvent,
    payload: AppTab,
    ctxMenuShow: boolean
  ) => {
    // When ctx menu is show, do not exec any more
    if (ctxMenuShow) return

    devToolX.value = event.clientX
    devToolY.value =
      devToolY.value > event.clientY ? devToolY.value : event.clientY

    currentMouseTab.value = payload

    timeoutId.value = setTimeout(() => {
      devToolShow.value = true
      clearTimeout(timeoutId.value!)
    }, 2000)
  }

  return {
    devToolX,
    devToolY,
    currentMouseTab,
    devToolShow,
    timeoutId,
    onOpenDevTool,
    onOpenFile,
  }
}
