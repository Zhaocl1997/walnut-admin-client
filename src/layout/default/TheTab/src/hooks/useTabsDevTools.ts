import projectPath from '../../../../../../build/projectPath'

export const useTabsDevTools = () => {
  const currentMouseTab = ref<AppTab>()
  const path = ref('')
  const devToolShow = ref(false)

  const onOpenFile = () => {
    window.open(`vscode://file/${projectPath}/${path.value}.vue`)
    devToolShow.value = true
  }

  const onOpenDevTool = (payload: AppTab) => {
    currentMouseTab.value = payload
    setTimeout(() => {
      path.value = payload.meta.component!
      devToolShow.value = true
    }, 1500)
  }

  return {
    currentMouseTab,
    devToolShow,
    onOpenDevTool,

    onOpenFile,
  }
}
