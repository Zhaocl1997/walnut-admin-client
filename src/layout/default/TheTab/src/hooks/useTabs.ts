import type { WScrollbarRef } from '/@/components/UI/Scrollbar'
import type { AppTab } from '../types'

import { watchEffect, ref, nextTick, computed } from 'vue'

import { useAppRoute, useAppRouter } from '/@/router'

import { calcIndex, createTab } from '../utils'
import { useAppContext } from '/@/App'
import { tabActionCreate } from '/@/store/actions/tabs'

/**
 * @description use watchEffect to build tabs
 */
export const useTabs = () => {
  const scrollRef = ref<Nullable<WScrollbarRef>>(null)

  const { app, tab } = useAppContext()

  const route = useAppRoute()

  const { currentRoute } = useAppRouter()

  /**
   * @description Computed tabs
   */
  const getTabs = computed(() => tab.value.tabs)

  /**
   * @description Computed current tab index
   */
  const currentRouteTabIndex = computed(() =>
    getTabs.value.findIndex(
      (item: AppTab) => item.name === currentRoute.value.name
    )
  )

  watchEffect(
    () => {
      // Build tab
      tabActionCreate(createTab(route))

      // scroll by index
      nextTick(() => {
        // If is mobile, just scroll to current route tab index
        // Others leave a room for index
        scrollRef.value?.scrollToAdvanced({
          index: app.value.isMobile
            ? currentRouteTabIndex.value
            : calcIndex(currentRouteTabIndex.value),
        })
      })
    },
    // This is important
    // If no flush: 'post', this effect will trigger in instance for the first time which cause an null error.
    // With flush: 'post', make sure triggered not in a instance
    { flush: 'post' }
  )

  return { scrollRef, getTabs, currentRouteTabIndex }
}
