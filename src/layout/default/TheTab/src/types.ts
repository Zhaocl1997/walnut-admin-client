import type { WScrollbarRef } from '/@/components/Extra/Scrollbar'

export interface AppTabUtilListItem {
  icon: string
  event: Fn
}

export interface AppTabContext {
  scrollRef: Ref<Nullable<WScrollbarRef>>

  x: Ref<number>
  y: Ref<number>
  ctxMenuShow: Ref<boolean>

  onTabClick: (name: string) => void
  onTabRemove: (name: string, type?: ValueOfDeleteTabConst) => void

  onOpenCtxMenu: (event: MouseEvent, tab: AppTab, index: number) => void
  onCloseCtxMenu: () => void

  devToolX: Ref<number>
  devToolY: Ref<number>
  currentMouseTab: Ref<AppTab | undefined>
  devToolShow: Ref<boolean>
  timeoutId: Ref<NodeJS.Timeout | undefined>
  onOpenDevTool: (
    event: MouseEvent,
    payload: AppTab,
    ctxMenuShow: boolean
  ) => void
  onOpenFile: Fn
}
