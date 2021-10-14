<template>
  <div class="flex flex-nowrap flex-row justify-between">
    <!-- left action -->
    <div class="flex flex-nowrap flex-row flex-none justify-start">
      <TabsContentLeft />
    </div>

    <!-- main content -->
    <div
      class="flex flex-grow h-10"
      :style="{ width: 'calc(100vw - 14rem - 300px)' }"
    >
      <TabsContentMain></TabsContentMain>
    </div>

    <!-- right action -->
    <div class="flex flex-nowrap flex-row flex-none justify-end">
      <TabsContentRight />
    </div>

    <!-- context menu -->
    <TabsContextMenu />
  </div>
</template>

<script lang="ts">
  import TabsContentMain from './components/tabsContentMain.vue'
  import TabsContentLeft from './components/tabsContentLeft.vue'
  import TabsContentRight from './components/tabsContentRight.vue'
  import TabsContextMenu from './components/tabsContextMenu.vue'

  import { useTabs } from './hooks/useTabs'
  import { useTabsActions } from './hooks/useTabsActions'
  import { useTabsContextMenu } from './hooks/useTabsContextMenu'
  import { useTabsMethods } from './hooks/useTabsMethods'

  import { setTabsContext } from './hooks/useTabsContext'

  export default defineComponent({
    name: 'Tabs',

    components: {
      TabsContentMain,
      TabsContentLeft,
      TabsContentRight,
      TabsContextMenu,
    },

    setup() {
      const { scrollRef, getTabs, currentRouteTabIndex } = useTabs()

      const { onTabClick, onTabRemove } = useTabsActions()

      const {
        ctxMenuVisible,
        currentTabName,
        currentTabIndex,

        getCtxMenuStyle,

        onCtxMenu,
        onCloseCtxMenu,
      } = useTabsContextMenu()

      const { leftMethods, rightMethods } = useTabsMethods({
        scrollRef,
        currentRouteTabIndex,
      })

      // set context
      setTabsContext({
        scrollRef,
        getTabs,

        onTabClick,
        onTabRemove,

        ctxMenuVisible,
        currentTabName,
        currentTabIndex,

        getCtxMenuStyle,

        onCtxMenu,
        onCloseCtxMenu,

        leftMethods,
        rightMethods,
      })

      return {}
    },
  })
</script>

<style lang="scss" scoped></style>
