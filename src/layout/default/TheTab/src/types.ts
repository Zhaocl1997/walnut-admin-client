import type { WScrollbarRef } from '/@/components/Extra/Scrollbar'

export interface AppTabUtilListItem {
  icon: string
  helpMessage: ComputedRef<string>
  event: Fn
}

export interface AppTabContext {
  scrollRef: Ref<Nullable<WScrollbarRef>>

  x: Ref<number>
  y: Ref<number>
  ctxMenuShow: Ref<boolean>

  onTabClick: (item: AppTab) => void
  onTabRemove: (name: string, type?: ValueOfDeleteTabConst) => void

  onOpenCtxMenu: (event: MouseEvent) => void
  onCloseCtxMenu: () => void

  devToolX: Ref<number>
  devToolY: Ref<number>
  currentMouseTab: Ref<AppTab | undefined>
  currentMouseTabIndex: Ref<number>
  devToolShow: Ref<boolean>
  timeoutId: Ref<NodeJS.Timeout | undefined>
  onOpenDevTool: (
    event: MouseEvent,
    payload: AppTab,
    index: number,
    ctxMenuShow: boolean
  ) => void
  onOpenFile: Fn

  setItemRef: Fn
  startBounce: Fn
  stopBounce: Fn
}
