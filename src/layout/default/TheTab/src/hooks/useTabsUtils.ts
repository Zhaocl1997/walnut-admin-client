import type { AppTabUtilListItem } from '../types'
import type { WScrollbarRef } from '/@/components/Extra/Scrollbar'

import { useRedirect } from '/@/hooks/core/useRedirect'

export const useTabsUtils = (
  scrollRef: Ref<Nullable<WScrollbarRef>>,
  targetTabIndex: Ref<number>
) => {
  const leftUtils: AppTabUtilListItem[] = [
    {
      icon: 'ant-design:double-left-outlined',
      event: () => {
        scrollRef.value?.scrollToStart()
      },
    },
    {
      icon: 'ant-design:aim-outlined',
      event: () => {
        scrollRef.value?.scrollToIndex(targetTabIndex.value)
      },
    },
  ]

  const rightUtils: AppTabUtilListItem[] = [
    {
      icon: 'ant-design:sync-outlined',
      event: async () => {
        const { redirect } = useRedirect()
        await redirect()
      },
    },
    {
      icon: 'ant-design:double-right-outlined',
      event: () => {
        scrollRef.value?.scrollToEnd()
      },
    },
  ]

  return {
    leftUtils,
    rightUtils,
  }
}
