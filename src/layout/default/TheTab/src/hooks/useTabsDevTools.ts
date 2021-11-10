import projectPath from '../../../../../../build/projectPath'

export const useTabsDevTools = () => {
  const currentMouseTab = ref<AppTab>()
  const path = ref('')
  const devToolShow = ref(false)
  const timeoutId = ref<NodeJS.Timeout>()

  const onOpenFile = () => {
    window.open(`vscode://file/${projectPath}/${path.value}.vue`)
    devToolShow.value = true
  }

  const onOpenDevTool = (payload: AppTab) => {
    currentMouseTab.value = payload
    timeoutId.value = setTimeout(() => {
      path.value = payload.meta.component!
      devToolShow.value = true
      clearTimeout(timeoutId.value!)
    }, 1500)
  }

  return {
    currentMouseTab,
    devToolShow,
    timeoutId,
    onOpenDevTool,
    onOpenFile,
  }
}
