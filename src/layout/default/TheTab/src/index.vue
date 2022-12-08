<template>
  <w-transition appear :name="appSetting.getTabsTrasition">
    <n-layout-header
      :id="appSetting.getTabsId"
      v-if="appSetting.getTabsShow"
      bordered
      :inverted="appSetting.getTabsInverted"
      :style="{ zIndex: 999, height: `${appSetting.tabs.height}px` }"
      :class="{
        'top-0': appSetting.getTabsFixed,
        '!top-[48px]': appSetting.getHeaderShow && appSetting.getHeaderFixed,
      }"
      class="flex-none sticky left-0"
    >
      <div class="h-full hstack justify-between">
        <!-- left utils -->
        <w-transition appear name="fade-left">
          <TabsUtils
            v-if="getShowUtils"
            class="hstack flex-none justify-start"
            :lists="leftUtils"
          ></TabsUtils>
        </w-transition>

        <TabsContentMain
          :style="{
            width: appAdapter.isMobile
              ? '100vw'
              : `calc(100vw - ${appSetting.menu.width}px - ${
                  isOverflow ? '120px' : '0px'
                })`,
          }"
        ></TabsContentMain>

        <!-- right utils -->
        <w-transition appear name="fade-right">
          <TabsUtils
            v-if="getShowUtils"
            class="hstack flex-none justify-end"
            :lists="rightUtils"
          ></TabsUtils>
        </w-transition>

        <!-- tabs contextmenu -->
        <TabsContextMenu></TabsContextMenu>

        <!-- dev tools -->
        <TabsDevTools></TabsDevTools>
      </div>
    </n-layout-header>
  </w-transition>
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

  const getShowUtils = computed(
    () =>
      !appAdapter.isMobile &&
      appSetting.tabs.showUtils &&
      (appSetting.tabs.utilsMode === AppConstTabUtilsShowMode.ALWAYS ||
        (appSetting.tabs.utilsMode === AppConstTabUtilsShowMode.OVERFLOW &&
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
