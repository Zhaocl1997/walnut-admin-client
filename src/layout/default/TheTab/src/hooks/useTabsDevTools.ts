import { paths } from '/build/_generated/paths'

export const useTabsDevTools = () => {
  const devToolShow = ref(false)
  const currentMouseTab = ref<AppTab>()
  const currentMouseTabIndex = ref<number>(0)

  const onOpenDevTool = () => {
    devToolShow.value = true
  }

  const onOpenFile = () => {
    const filePath = currentMouseTab.value?.meta.component
    openExternalLink(`vscode://file/${paths.view}/${filePath}.vue`)
    devToolShow.value = false
  }

  return {
    devToolShow,
    currentMouseTab,
    currentMouseTabIndex,
    onOpenDevTool,
    onOpenFile,
  }
}
