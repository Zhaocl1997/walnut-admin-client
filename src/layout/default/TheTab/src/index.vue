<template>
  <div class="*hstack justify-between p-1">
    <div v-if="tabSettings.showUtils" class="*hstack flex-none justify-start">
      <TabsUtils :lists="leftUtils"></TabsUtils>
    </div>

    <div
      class="flex flex-grow"
      :style="{
        width: `calc(100vw - ${settings.ForDevelopers.menu.width}px)`,
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

  const getShowDevTools = computed(() => isDev())

  const { settings } = useAppState()
  const tabSettings = settings.value.ForDevelopers.tab

  const { scrollRef, getCurrentRouteTabIndex } = useTabs()

  const { onTabClick, onTabRemove } = useTabsActions()

  const { x, y, ctxMenuShow, onOpenCtxMenu, onCloseCtxMenu } =
    useTabsContextMenu()

  const {
    devToolX,
    devToolY,
    currentMouseTab,
    devToolShow,
    timeoutId,
    onOpenDevTool,
    onOpenFile,
  } = useTabsDevTools()

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
    devToolShow,
    timeoutId,
    onOpenDevTool,
    onOpenFile,
  })
</script>
