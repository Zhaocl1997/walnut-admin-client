import type { AppTabUtilListItem } from '../types'
import type { WScrollbarInst } from '/@/components/Extra/Scrollbar'

import { useRedirect } from '/@/hooks/core/useRedirect'

export const useTabsUtils = (
  scrollRef: Ref<Nullable<WScrollbarInst>>,
  currentRouteTabIndex: Ref<number>,
  startBounce: Fn,
  stopBounce: Fn
) => {
  const { t } = useAppI18n()

  const leftUtils: AppTabUtilListItem[] = [
    {
      icon: 'ant-design:double-left-outlined',
      helpMessage: computed(() => t('app:tab:utils:scrollToLeft')),
      event: () => {
        scrollRef.value?.scrollToStart()
      },
    },
    {
      icon: 'ant-design:aim-outlined',
      helpMessage: computed(() => t('app:tab:utils:scrollToCurrent')),
      event: () => {
        scrollRef.value?.scrollToIndex(currentRouteTabIndex.value)
        nextTick(() => {
          startBounce()
          setTimeout(() => {
            stopBounce()
          }, 3000)
        })
      },
    },
  ]

  const rightUtils: AppTabUtilListItem[] = [
    {
      icon: 'ant-design:sync-outlined',
      helpMessage: computed(() => t('app:tab:utils:refresh')),
      event: async () => {
        const { redirect } = useRedirect()
        await redirect()
      },
    },
    {
      icon: 'ant-design:double-right-outlined',
      helpMessage: computed(() => t('app:tab:utils:scrollToRight')),
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
