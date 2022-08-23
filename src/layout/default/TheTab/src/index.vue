<template>
  <div id="walnut-tab" class="hstack justify-between p-1">
    <w-transition appear name="fade-left">
      <div
        v-if="appSetting.settings.tab.showUtils && isOverflow"
        class="hstack flex-none justify-start"
      >
        <TabsUtils :lists="leftUtils"></TabsUtils>
      </div>
    </w-transition>

    <TabsContentMain
      class="flex flex-grow"
      :style="{
        width: `calc(100vw - ${appSetting.settings.menu.width}px - ${
          isOverflow ? '120px' : '0px'
        })`,
      }"
    ></TabsContentMain>

    <w-transition appear name="fade-right">
      <div
        v-if="appSetting.settings.tab.showUtils && isOverflow"
        class="hstack flex-none justify-end"
      >
        <TabsUtils :lists="rightUtils"></TabsUtils>
      </div>
    </w-transition>

    <TabsContextMenu
      v-if="appSetting.settings.tab.contextMenu"
    ></TabsContextMenu>

    <TabsDevTools v-if="getShowDevTools"></TabsDevTools>
  </div>
</template>

<script lang="ts" setup>
  import TabsContentMain from './components/tabsContentMain.vue'
  import TabsContextMenu from './components/tabsContextMenu.vue'
  import TabsDevTools from './components/tabsDevTools.vue'
  import TabsUtils from './components/tabsUtils.vue'

  import { useTabs } from './hooks/useTabs'
  import { useTabsActions } from './hooks/useTabsActions'
  import { useTabsContextMenu } from './hooks/useTabsContextMenu'
  import { useTabsUtils } from './hooks/useTabsUtils'
  import { useTabsDevTools } from './hooks/useTabsDevTools'
  import { useTabsDot } from './hooks/useTabsDot'

  import { setTabsContext } from './hooks/useTabsContext'

  const appTab = useAppStoreTab()
  const appSetting = useAppStoreSetting()
  const appAdapter = useAppStoreAdapter()

  watchEffect(() => {
    if (appSetting.settings.tab.persistent) {
      localStorage.setItem('tab', JSON.stringify(appTab.tabs))
    } else {
      localStorage.removeItem('tab')
    }
  })

  const getShowDevTools = computed(
    () => isDev() && !appAdapter.isMobile && appSetting.settings.tab.devtool
  )

  const { scrollRef, isOverflow, getCurrentRouteTabIndex } = useTabs()

  const {
    devToolX,
    devToolY,
    currentMouseTab,
    currentMouseTabIndex,
    devToolShow,
    timeoutId,
    onOpenDevTool,
    onOpenFile,
  } = useTabsDevTools()

  const { onTabClick, onTabRemove } = useTabsActions()

  const { x, y, ctxMenuShow, onOpenCtxMenu, onCloseCtxMenu } =
    useTabsContextMenu()

  const { setItemRef, startBounce, stopBounce } = useTabsDot()

  const { leftUtils, rightUtils } = useTabsUtils(
    scrollRef,
    getCurrentRouteTabIndex,
    startBounce,
    stopBounce
  )

  // set context
  setTabsContext({
    scrollRef,

    onTabClick,
    onTabRemove,

    x,
    y,
    ctxMenuShow,
    onOpenCtxMenu,
    onCloseCtxMenu,

    devToolX,
    devToolY,
    currentMouseTab,
    currentMouseTabIndex,
    devToolShow,
    timeoutId,
    onOpenDevTool,
    onOpenFile,

    setItemRef,
    startBounce,
    stopBounce,
  })
</script>
