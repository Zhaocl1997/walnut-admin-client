import type { WScrollbarRef } from '/@/components/UI/Scrollbar'
import type { AppTab } from '../types'

import { watchEffect, ref, nextTick, computed } from 'vue'

import { useAppStore } from '/@/store'
import { useAppRoute, useAppRouter } from '/@/router'

import { calcIndex, createTab } from '../utils'

/**
 * @description use watchEffect to build tabs
 */
export const useTabs = () => {
  const scrollRef = ref<Nullable<WScrollbarRef>>(null)

  const route = useAppRoute()

  const { currentRoute } = useAppRouter()

  const { dispatch, getters } = useAppStore()

  /**
   * @description Computed tabs
   */
  const getTabs = computed(() => getters.tabs)

  /**
   * @description Computed current tab index
   */
  const getCurrentRouteTabIndex = computed(() =>
    getTabs.value.findIndex(
      (item: AppTab) => item.name === currentRoute.value.name
    )
  )

  watchEffect(() => {
    // trigger store action, build the tabs
    dispatch('tab/commitRouteChange', createTab(route))

    // scroll by index
    nextTick(() => {
      scrollRef.value?.scrollToAdvanced({
        index: calcIndex(getCurrentRouteTabIndex.value),
      })
    })
  })

  return { scrollRef, getTabs, getCurrentRouteTabIndex }
}
