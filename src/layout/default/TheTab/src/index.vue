<template>
  <div class="flex flex-nowrap flex-row justify-between">
    <!-- left action -->
    <div class="flex flex-nowrap flex-row flex-none justify-start">
      <TabsLeftMethods :events="leftMethods" />
    </div>

    <div
      class="flex flex-grow h-10"
      :style="{ width: 'calc(100vw - 14rem - 300px)' }"
    >
      <TabsScroll>
        <ul class="h-full flex flex-row flex-nowrap">
          <li
            v-for="(tab, index) in getTabs"
            :class="[
              'flex space-x-1 flex-nowrap bg-primary bg-opacity-100 w-auto border border-solid border-blue-500 rounded-md shadow-lg mx-0.5 p-0.5 px-2 my-1 select-none cursor-pointer',
              {
                'text-blue-700 bg-secondary': $route.name === tab.name,
                'hover:text-blue-600 hover:bg-secondary':
                  $route.name !== tab.name,
              },
            ]"
            @click="onTabClick(tab.name)"
            @contextmenu.prevent.native="onContextMenu($event, tab.name, index)"
          >
            <!-- active symbol -->
            <div v-show="$route.name === tab.name" class="inline">
              <div
                class="border-8 border-solid border-blue-500 rounded-full h-4 w-4 mt-0.5 hover:border-blue-700"
              ></div>
            </div>

            <!-- title -->
            <div class="inline">
              <span
                class="whitespace-nowrap font-sans text-sm antialiased text-primary"
                >{{ getTitle(tab.meta.title) }}</span
              >
            </div>

            <!-- close icon -->
            <div v-show="tab.name !== indexName" class="inline">
              <i
                class="el-icon-close hover:bg-orange-400 rounded-full transform hover:scale-110 hover:opacity-80"
                @click.prevent.stop="onTabRemove(tab.name)"
              ></i>
            </div>
          </li>
        </ul>
      </TabsScroll>
    </div>

    <!-- context menu -->
    <transition name="zoom-out" mode="out-in">
      <div
        v-if="getContextMenuVisible"
        class="border border-solid border-gray-600 border-opacity-50 rounded bg-gray-50 p-1"
        :style="getContextMenuStyle"
        v-click-outside="onCloseContextMenu"
      >
        <TabsContextMenu />
      </div>
    </transition>

    <!-- right action -->
    <div class="flex flex-nowrap flex-row flex-none justify-end">
      <TabsRightMethods :events="rightMethods" />
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'

  import { indexName } from '/@/router/constant'
  import { getTitle } from '/@/views/system/menu/utils'

  import TabsScroll from './components/tabsScroll.vue'
  import TabsLeftMethods from './components/tabsLeftMethods.vue'
  import TabsRightMethods from './components/tabsRightMethods.vue'
  import TabsContextMenu from './components/tabsContextMenu.vue'

  import { useTabsContext } from './hooks/useTabsContext'
  import { useTabs } from './hooks/useTabs'
  import { useTabsActions } from './hooks/useTabsActions'
  import { useTabsContextMenu } from './hooks/useTabsContextMenu'
  import { useTabsMethods } from './hooks/useTabsMethods'

  export default defineComponent({
    name: 'Tabs',

    components: {
      TabsScroll,
      TabsLeftMethods,
      TabsRightMethods,
      TabsContextMenu,
    },

    setup() {
      const { setTabsContext } = useTabsContext()

      const { scrollRef, getTabs, getCurrentRouteTabIndex } = useTabs()

      const { onTabClick, onTabRemove } = useTabsActions()

      const {
        currentTabName,
        currentTabIndex,
        getContextMenuStyle,
        getContextMenuVisible,
        onContextMenu,
        onCloseContextMenu,
      } = useTabsContextMenu()

      const { leftMethods, rightMethods } = useTabsMethods(
        scrollRef,
        getCurrentRouteTabIndex
      )

      // set context
      setTabsContext({
        scrollRef: scrollRef,

        getTabs: getTabs,

        currentTabName: currentTabName,
        currentTabIndex: currentTabIndex,
        onTabRemove: onTabRemove,

        leftMethods: leftMethods,
        rightMethods: rightMethods,

        closeContextMenu: () => {
          getContextMenuVisible.value && onCloseContextMenu()
        },
      })

      return {
        getTitle,
        indexName,

        scrollRef,
        getTabs,

        onTabClick,
        onTabRemove,

        getContextMenuStyle,
        getContextMenuVisible,
        onContextMenu,
        onCloseContextMenu,

        leftMethods,
        rightMethods,
      }
    },
  })
</script>

<style lang="scss" scoped></style>
