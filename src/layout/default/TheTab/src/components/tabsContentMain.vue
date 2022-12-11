<template>
  <w-scrollbar
    ref="scrollRef"
    @scroll="onCloseCtxMenu"
    x-scrollable
    height="100%"
    hide-scrollbar
  >
    <div
      ref="sortableRef"
      :class="[
        'hstack h-full',
        {
          'divide-x-1 divide-gray-400': isCardType,
          'gap-x-1': isRoundType,
        },
      ]"
    >
      <w-transition appear :name="appSetting.tabs.itemTransition" group>
        <div
          v-for="(item, index) in appTab.tabs"
          :key="item.name"
          :class="[
            'my-1',

            $route.name === item.name && 'text-primary',

            /* card */
            isCardType && !appSetting.app.reducedMotion && 'hvr-sweep-to-right',
            isCardType &&
              $route.name === item.name &&
              'bg-primary !text-bodyColor',

            /* flex */
            isFlexType &&
              !appSetting.app.reducedMotion &&
              'hvr-underline-from-left',
            isFlexType &&
              $route.name === item.name &&
              'border-b-1 border-primaryHover',

            /* round */
            isRoundType &&
              `${
                !appSetting.app.reducedMotion ? 'hvr-round-corners' : ''
              } rounded border-0.5 border-solid border-primaryHover`,
            isRoundType && $route.name === item.name && 'rounded-2xl',

            {
              'tab-draggable': !item.meta.affix,
            },
          ]"
          @click="onTabClick(item)"
          @mouseup="onMouseUp($event, item.name)"
          @contextmenu.prevent.native="onOpenContextMenu($event, item, index)"
        >
          <TabsItem :item="item" :index="index"></TabsItem>
        </div>
      </w-transition>
    </div>
  </w-scrollbar>
</template>

<script lang="ts" setup>
  import TabsItem from './tabsItem.vue'
  import { getTabsContext } from '../hooks/useTabsContext'
  import { useTabsSortable } from '../hooks/useTabsSortable'

  const appTab = useAppStoreTab()
  const appSetting = useAppStoreSetting()

  const { el: sortableRef } = useTabsSortable(
    computed(() => appSetting.tabs.sortable)
  )

  const AppConstTabStyleModeInside = AppConstTabStyleMode

  const isCardType = computed(
    () => appSetting.tabs.styleMode === AppConstTabStyleModeInside.CARD
  )
  const isFlexType = computed(
    () => appSetting.tabs.styleMode === AppConstTabStyleModeInside.FLEX
  )
  const isRoundType = computed(
    () => appSetting.tabs.styleMode === AppConstTabStyleModeInside.ROUND
  )

  const {
    scrollRef,
    onTabClick,
    onTabRemove,
    onOpenCtxMenu,
    onCloseCtxMenu,

    currentMouseTab,
    currentMouseTabIndex,
  } = getTabsContext()

  const onOpenContextMenu = (e: MouseEvent, item: AppTab, index: number) => {
    currentMouseTab.value = item
    currentMouseTabIndex.value = index

    // open ctx menu
    onOpenCtxMenu(e)
  }

  const onMouseUp = (e: MouseEvent, name: string) => {
    // middle button close
    // 1 stands for mouse middle button
    if (e.button === 1) {
      const isRemoveable = !appTab.tabs
        .filter((i) => i.meta.affix)
        .map((i) => i.name)
        .includes(name)

      isRemoveable && onTabRemove(name)
    }
  }
</script>
