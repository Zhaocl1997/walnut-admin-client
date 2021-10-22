import type { RouteMeta } from 'vue-router'

import type { WScrollbarRef } from '/@/components/Extra/Scrollbar'

export interface AppTab {
  name: string
  path: string
  meta: RouteMeta
}

export interface AppTabUtilListItem {
  icon: string
  event: Fn
}

export interface AppTabContext {
  scrollRef: Ref<Nullable<WScrollbarRef>>
  getTabs: ComputedRef<AppTab[]>

  x: Ref<number>
  y: Ref<number>
  targetTab: Ref<Nullable<AppTab>>
  targetTabIndex: Ref<number>
  ctxMenuVisible: Ref<boolean>

  onTabClick: (name: string) => void
  onTabRemove: (name: string, type?: ValueOfDeleteTabConst) => void

  onOpenCtxMenu: (event: MouseEvent, tab: AppTab, index: number) => void
  onCloseCtxMenu: () => void
}
