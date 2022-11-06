import type { WScrollbarInst } from '@/components/Extra/Scrollbar'

export interface AppTabUtilListItem {
  icon: string
  helpMessage: Fn<void, string>
  event: Fn
}

export interface AppTabItemInst {
  start: Fn
  stop: Fn
}

export interface AppTabContext {
  scrollRef: Ref<Nullable<WScrollbarInst>>
  onScrollToCurrentTab: Fn

  x: Ref<number>
  y: Ref<number>
  ctxMenuShow: Ref<boolean>

  onTabClick: (item: AppTab) => void
  onTabRemove: (name: string, type?: ValueOfAppConstTabDeleteType) => void

  onOpenCtxMenu: (event: MouseEvent) => void
  onCloseCtxMenu: () => void

  devToolShow: Ref<boolean>
  currentMouseTab: Ref<AppTab | undefined>
  currentMouseTabIndex: Ref<number>
  onOpenDevTool: Fn
  onOpenFile: Fn

  setItemRef: Fn
}
