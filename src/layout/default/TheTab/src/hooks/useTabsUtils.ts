import type { AppTabUtilListItem } from '../types'
import type { WScrollbarInst } from '@/components/Extra/Scrollbar'

export const useTabsUtils = (
  scrollRef: Ref<Nullable<WScrollbarInst>>,
  scrollToCurrentTab: Fn
) => {
  const { t } = useAppI18n()

  const appTabs = useAppStoreTab()

  const leftUtils: AppTabUtilListItem[] = [
    {
      icon: 'ant-design:double-left-outlined',
      helpMessage: () => t('app.tab.utils.scrollToLeft'),
      event: () => {
        scrollRef.value?.scrollToStart()
      },
    },
    {
      icon: 'ant-design:aim-outlined',
      helpMessage: () => t('app.tab.utils.scrollToCurrent'),
      event: () => {
        scrollToCurrentTab()

        appTabs.setCurrentTabMeta({ _hovered: true })
        const { stop } = useTimeoutFn(() => {
          appTabs.setCurrentTabMeta({ _hovered: false })
          stop()
        }, 3000)
      },
    },
  ]

  const rightUtils: AppTabUtilListItem[] = [
    {
      icon: 'ant-design:sync-outlined',
      helpMessage: () => t('app.tab.utils.refresh'),
      event: async () => {
        await useRedirect()
      },
    },
    {
      icon: 'ant-design:double-right-outlined',
      helpMessage: () => t('app.tab.utils.scrollToRight'),
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
