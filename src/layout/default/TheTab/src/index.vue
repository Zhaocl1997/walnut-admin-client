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
import { useTabsPersistent } from './hooks/useTabsPersistent'

import { setTabsContext } from './hooks/useTabsContext'

const appSetting = useAppStoreSetting()
const appAdapter = useAppStoreAdapter()

const { scrollRef, isOverflow, onScrollToCurrentTab, onUpdateOverflow }
  = useTabs()

const getShowUtils = computed(
  () =>
    !appAdapter.isMobile
    && appSetting.tabs.showUtils
    && (appSetting.tabs.utilsMode === AppConstTabUtilsShowMode.ALWAYS
    || (appSetting.tabs.utilsMode === AppConstTabUtilsShowMode.OVERFLOW
    && isOverflow.value)),
)

const {
  devToolShow,
  currentMouseTab,
  currentMouseTabIndex,
  onOpenDevTool,
  onOpenFile,
} = useTabsDevTools()

const { onTabClick, onTabRemove } = useTabsActions(onUpdateOverflow)

const { x, y, ctxMenuShow, onOpenCtxMenu, onCloseCtxMenu }
  = useTabsContextMenu()

const { leftUtils, rightUtils } = useTabsUtils(
  scrollRef,
  onScrollToCurrentTab,
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
})
</script>

<template>
  <w-transition appear :name="appSetting.getTabsTrasition">
    <n-layout-header
      v-if="appSetting.getTabsShow" :id="appSetting.getTabsId" bordered
      :inverted="appSetting.getTabsInverted" :style="{ zIndex: 999, height: `${appSetting.tabs.height}px` }" :class="{
        'top-0': appSetting.getTabsFixed,
        '!top-[48px]': appSetting.getHeaderShow && appSetting.getHeaderFixed,
      }" class="sticky left-0 flex-none"
    >
      <div class="h-full hstack justify-between">
        <!-- left utils -->
        <w-transition appear name="fade-left">
          <TabsUtils v-if="getShowUtils" class="hstack flex-none justify-start" :lists="leftUtils" />
        </w-transition>

        <TabsContentMain
          class="mx-1 flex-grow"
          :style="{
            width: appAdapter.isMobile
              ? '100vw'
              : `calc(100vw - ${appSetting.menu.width}px - ${isOverflow ? '120px' : '0px'
              })`,
          }"
        />

        <!-- right utils -->
        <w-transition appear name="fade-right">
          <TabsUtils v-if="getShowUtils" class="hstack flex-none justify-end" :lists="rightUtils" />
        </w-transition>

        <!-- tabs contextmenu -->
        <TabsContextMenu />

        <!-- dev tools -->
        <TabsDevTools />
      </div>
    </n-layout-header>
  </w-transition>
</template>
