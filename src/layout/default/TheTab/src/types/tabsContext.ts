import type { ComputedRef, Ref } from '@vue/reactivity'
import type { AppTab } from '.'
import type { WScrollbarRef } from '/@/components/UI/Scrollbar'
import { DeleteTabTypeEnum } from '/@/enums/tab'

export interface TabsContext {
  scrollRef: Ref<Nullable<WScrollbarRef>>
  getTabs: ComputedRef<AppTab[]>
  onTabClick: (name: string) => void
  onTabRemove: (name: string, type?: DeleteTabTypeEnum) => void
  ctxMenuVisible: Ref<boolean>
  currentTabName: Ref<string>
  currentTabIndex: Ref<number>
  getCtxMenuStyle: ComputedRef
  onCtxMenu: (event: MouseEvent, name: string, index: number) => void
  onCloseCtxMenu: () => void
  leftMethods: {
    onScrollToStart: () => void
    onScrollToCurrent: () => void
  }
  rightMethods: {
    onScrollToEnd: () => void
  }
}
