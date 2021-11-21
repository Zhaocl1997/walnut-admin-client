<template>
  <div class="*hstack justify-between p-1">
    <div v-if="tabSettings.showUtils" class="*hstack flex-none justify-start">
      <TabsUtils :lists="leftUtils"></TabsUtils>
    </div>

    <div
      class="flex flex-grow"
      :style="{
        width: `calc(100vw - ${settings.ForDevelopers.menu.width}px - 120px)`,
      }"
    >
      <TabsContentMain></TabsContentMain>
    </div>

    <div v-if="tabSettings.showUtils" class="*hstack flex-none justify-end">
      <TabsUtils :lists="rightUtils"></TabsUtils>
    </div>

    <TabsContextMenu v-if="tabSettings.contextMenu" />
    <TabsDevTools v-if="getShowDevTools" />
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

  import { setTabsContext } from './hooks/useTabsContext'
  import { isDev } from '/@/utils/constant/vue'

  const { settings } = useAppState()
  const tabSettings = settings.value.ForDevelopers.tab

  const getShowDevTools = computed(() => isDev() && tabSettings.devtool)

  const { scrollRef, getCurrentRouteTabIndex } = useTabs()

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

  const { onTabClick, onTabRemove } = useTabsActions(currentMouseTab)

  const { x, y, ctxMenuShow, onOpenCtxMenu, onCloseCtxMenu } =
    useTabsContextMenu()

  const { leftUtils, rightUtils } = useTabsUtils(
    scrollRef,
    getCurrentRouteTabIndex
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
  })
</script>
