import type { RouteMeta } from 'vue-router'
import type { ComputedRef, Ref } from 'vue'

import type { WScrollbarRef } from '/@/components/Extra/Scrollbar'

import { DeleteTabTypeEnum } from '/@/enums/tab'

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
  onTabClick: (name: string) => void
  onTabRemove: (name: string, type?: DeleteTabTypeEnum) => void
  ctxMenuVisible: Ref<boolean>
  targetTabName: Ref<string>
  targetTabIndex: Ref<number>
  getCtxMenuStyle: ComputedRef
  onCtxMenu: (event: MouseEvent, name: string, index: number) => void
  onCloseCtxMenu: () => void
}
