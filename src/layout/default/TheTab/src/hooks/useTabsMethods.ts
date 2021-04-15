import type { ComputedRef, Ref } from 'vue'
import type { WScrollbarRef } from '/@/components/UI/Scrollbar'

export const useTabsMethods = (
  scrollRef: Ref<Nullable<WScrollbarRef>>,
  currentTabIndex: ComputedRef<number>
) => {
  const leftMethods = {
    onScrollToStart: () => {
      scrollRef.value!.scrollToStart()
    },

    onScrollToCurrent: () => {
      scrollRef.value!.scrollToAdvanced({ index: currentTabIndex.value })
    },
  }

  const rightMethods = {
    onScrollToEnd: () => {
      scrollRef.value!.scrollToEnd()
    },
  }

  return {
    leftMethods,
    rightMethods,
  }
}
