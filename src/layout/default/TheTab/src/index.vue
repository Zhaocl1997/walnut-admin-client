<template>
  <div id="walnut-tab" class="hstack justify-between">
    <w-transition appear name="fade-left">
      <div v-if="getShowUtils" class="hstack flex-none justify-start">
        <TabsUtils :lists="leftUtils"></TabsUtils>
      </div>
    </w-transition>

    <TabsContentMain
      :style="{
        width: appAdapter.isMobile
          ? '100vw'
          : `calc(100vw - ${appSetting.settings.menu.width}px - ${
              isOverflow ? '120px' : '0px'
            })`,
      }"
    ></TabsContentMain>

    <w-transition appear name="fade-right">
      <div v-if="getShowUtils" class="hstack flex-none justify-end">
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
  import { useTabsPersistent } from './hooks/useTabsPersistent'

  import { setTabsContext } from './hooks/useTabsContext'

  const appSetting = useAppStoreSetting()
  const appAdapter = useAppStoreAdapter()

  const getShowDevTools = computed(() => isDev() && !appAdapter.isMobile)

  const getShowUtils = computed(
    () =>
      !appAdapter.isMobile &&
      appSetting.settings.tab.showUtils &&
      (appSetting.settings.tab.showUtilsMode ===
        AppConstTabUtilsShowMode.ALWAYS ||
        (appSetting.settings.tab.showUtilsMode ===
          AppConstTabUtilsShowMode.OVERFLOW &&
          isOverflow.value))
  )

  const { scrollRef, isOverflow, onScrollToCurrentTab, onUpdateOverflow } =
    useTabs()

  const {
    devToolShow,
    currentMouseTab,
    currentMouseTabIndex,
    onOpenDevTool,
    onOpenFile,
  } = useTabsDevTools()

  const { onTabClick, onTabRemove } = useTabsActions(onUpdateOverflow)

  const { x, y, ctxMenuShow, onOpenCtxMenu, onCloseCtxMenu } =
    useTabsContextMenu()

  const { itemInst, setItemRef } = useTabsDot()

  const { leftUtils, rightUtils } = useTabsUtils(
    scrollRef,
    onScrollToCurrentTab,
    itemInst
  )

  // tab persistent
  useTabsPersistent()

  // set context
  setTabsContext({
    scrollRef,
    onScrollToCurrentTab,

    onTabClick,
    onTabRemove,

    x,
    y,
    ctxMenuShow,
    onOpenCtxMenu,
    onCloseCtxMenu,

    devToolShow,
    currentMouseTab,
    currentMouseTabIndex,
    onOpenDevTool,
    onOpenFile,

    setItemRef,
  })
</script>
