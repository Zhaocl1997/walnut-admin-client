<script lang="ts" setup>
import { useSortable } from '@vueuse/integrations/useSortable'
import { getTabsContext } from '../hooks/useTabsContext'
import TabsItem from './tabsItem.vue'

const appTab = useAppStoreTab()
const appSetting = useAppStoreSetting()

const sortableRef = ref()

const { start, stop } = useSortable(sortableRef, appTab.tabs, {
  animation: 150,
  delay: 50,
  delayOnTouchOnly: true,

  draggable: '.tab-draggable',
  onEnd: (evt) => {
    const { oldIndex, newIndex } = evt

    appTab.changeTabOrder(oldIndex!, newIndex!)
  },
})

watchEffect(() => {
  if (appSetting.tabs.sortable)
    start()

  else
    stop()
})

const AppConstTabStyleModeInside = AppConstTabStyleMode

const isCardType = computed(
  () => appSetting.tabs.styleMode === AppConstTabStyleModeInside.CARD,
)
const isFlexType = computed(
  () => appSetting.tabs.styleMode === AppConstTabStyleModeInside.FLEX,
)
const isRoundType = computed(
  () => appSetting.tabs.styleMode === AppConstTabStyleModeInside.ROUND,
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

function onOpenContextMenu(e: MouseEvent, item: AppTab, index: number) {
  currentMouseTab.value = item
  currentMouseTabIndex.value = index

  // open ctx menu
  onOpenCtxMenu(e)
}

function onMouseUp(e: MouseEvent, name: string) {
  // middle button close
  // 1 stands for mouse middle button
  if (e.button === 1) {
    const isRemoveable = !appTab.tabs
      .filter(i => i.meta.affix)
      .map(i => i.name)
      .includes(name)

    isRemoveable && onTabRemove(name)
  }
}
</script>

<template>
  <w-scrollbar
    ref="scrollRef"
    x-scrollable
    height="100%"
    hide-scrollbar
    @scroll="onCloseCtxMenu"
  >
    <div
      ref="sortableRef"
      class="hstack h-full" :class="[
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
          class="my-1" :class="[
            $route.name === item.name && 'text-primary',

            /* card */
            isCardType && !appSetting.app.reducedMotion && 'hvr-sweep-to-right',
            isCardType
              && $route.name === item.name
              && 'bg-primary !text-bodyColor',

            /* flex */
            isFlexType
              && !appSetting.app.reducedMotion
              && 'hvr-underline-from-left',
            isFlexType
              && $route.name === item.name
              && 'border-b-1 border-primaryHover',

            /* round */
            isRoundType
              && `${
                !appSetting.app.reducedMotion ? 'hvr-round-corners' : ''
              } rounded border-0.5 border-solid border-primaryHover`,
            isRoundType && $route.name === item.name && 'rounded-2xl',

            {
              'tab-draggable': !item.meta.affix,
            },
          ]"
          @click="onTabClick(item)"
          @mouseup="onMouseUp($event, item.name)"
          @contextmenu.prevent="onOpenContextMenu($event, item, index)"
        >
          <TabsItem :item="item" :index="index" />
        </div>
      </w-transition>
    </div>
  </w-scrollbar>
</template>
