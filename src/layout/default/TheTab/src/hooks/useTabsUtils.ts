import type { Ref } from 'vue'
import type { AppTabUtilListItem } from '../types'
import type { WScrollbarRef } from '/@/components/Extra/Scrollbar'

export const useTabsUtils = (
  scrollRef: Ref<Nullable<WScrollbarRef>>,
  targetTabIndex: number
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
        scrollRef.value?.scrollToIndex(targetTabIndex)
      },
    },
  ]

  const rightUtils: AppTabUtilListItem[] = [
    {
      icon: 'ant-design:sync-outlined',
      event: () => {
        console.log('refresh')
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
