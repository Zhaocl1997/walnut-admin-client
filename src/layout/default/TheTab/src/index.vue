<template>
  <div class="*hstack justify-between p-1">
    <div class="*hstack flex-none justify-start">
      <TabsUtils :lists="leftUtils"></TabsUtils>
    </div>

    <div
      class="flex flex-grow h-10"
      :style="{ width: 'calc(100vw - 14rem - 300px)' }"
    >
      <TabsContentMain></TabsContentMain>
    </div>

    <div class="*hstack flex-none justify-end">
      <TabsUtils :lists="rightUtils"></TabsUtils>
    </div>

    <TabsContextMenu />
  </div>
</template>

<script lang="ts" setup>
  import TabsContentMain from './components/tabsContentMain.vue'
  import TabsContextMenu from './components/tabsContextMenu.vue'
  import TabsUtils from './components/tabsUtils.vue'

  import { useTabs } from './hooks/useTabs'
  import { useTabsActions } from './hooks/useTabsActions'
  import { useTabsContextMenu } from './hooks/useTabsContextMenu'
  import { useTabsUtils } from './hooks/useTabsUtils'

  import { setTabsContext } from './hooks/useTabsContext'

  const { scrollRef, getCurrentRouteTabIndex } = useTabs()

  const { onTabClick, onTabRemove } = useTabsActions()

  const { x, y, ctxMenuVisible, onOpenCtxMenu, onCloseCtxMenu } =
    useTabsContextMenu()

  const { leftUtils, rightUtils } = useTabsUtils(
    scrollRef,
    getCurrentRouteTabIndex.value
  )

  // set context
  setTabsContext({
    scrollRef,

    onTabClick,
    onTabRemove,

    x,
    y,
    ctxMenuVisible,
    onOpenCtxMenu,
    onCloseCtxMenu,
  })
</script>
