<template>
  <w-scrollbar
    ref="scrollRef"
    @scroll="onCloseCtxMenu"
    vertical
    :height="appSetting.settings.tab.height + 'px'"
  >
    <ul id="tabSortable" class="hstack">
      <w-transition appear :name="appSetting.settings.tab.animationName" group>
        <li
          v-for="(item, index) in appTab.tabs"
          :key="item.name"
          :class="[
            {
              'text-primary hover:text-primaryHover': $route.name === item.name,
            },

            /* card */
            appSetting.settings.tab.styleMode ===
              AppConstTabStyleModeInside.CARD &&
              ($route.name === item.name
                ? 'border border-primary'
                : 'border border-gray-400 hover:border-primaryHover hover:text-primaryHover'),

            /* flex */
            appSetting.settings.tab.styleMode ===
              AppConstTabStyleModeInside.FLEX &&
              ($route.name === item.name
                ? 'tab-flex border-primary'
                : 'hover:border-primaryHover hover:text-primaryHover hover:tab-flex'),

            /* round */
            appSetting.settings.tab.styleMode ===
              AppConstTabStyleModeInside.ROUND &&
              ($route.name === item.name
                ? 'rounded-xl bg-primary text-light-100'
                : 'rounded-xl hover:bg-primaryHover hover:text-bodyColor'),

            'hstack cursor-pointer items-center w-auto select-none space-x-1 shadow mx-0.5 px-2 p-px',
            {
              'tab-draggable': !item.meta.affix,
            },
          ]"
          @click="onTabClick(item)"
          @mouseup="onMouseUp($event, item.name)"
          @contextmenu.prevent.native="onOpenContextMenu($event, item, index)"
          @mouseenter="onMouseEnter($event, item, index)"
          @mouseleave="onMouseLeave(item)"
        >
          <w-icon
            v-if="
              !appAdapter.isMobile &&
              !appSetting.settings.tab.showIcon &&
              item.meta.affix
            "
            height="16"
            icon="ant-design:pushpin-filled"
          ></w-icon>

          <TabDot
            :ref="setItemRef"
            v-else-if="
              !appAdapter.isMobile &&
              !appSetting.settings.tab.showIcon &&
              $route.name === item.name
            "
          ></TabDot>

          <w-icon
            v-if="appSetting.settings.tab.showIcon"
            :icon="item.meta.icon"
            height="16"
          ></w-icon>

          <span class="text-sm whitespace-nowrap">
            {{ t(item.meta.title!) }}
          </span>

          <w-icon
            v-if="!item.meta.affix"
            icon="ant-design:close-outlined"
            width="12"
            class="hover:text-error hover:scale-125 rounded-full transform"
            @click.prevent.stop="onTabRemove(item.name)"
          ></w-icon>
        </li>
      </w-transition>
    </ul>
  </w-scrollbar>
</template>

<script lang="ts" setup>
  import TabDot from './dot'
  import { getTabsContext } from '../hooks/useTabsContext'
  import { useTabsSortable } from '../hooks/useTabsSortable'

  const { t } = useAppI18n()
  const { currentRoute } = useAppRouter()

  const appTab = useAppStoreTab()
  const appSetting = useAppStoreSetting()
  const appAdapter = useAppStoreAdapter()

  const AppConstTabStyleModeInside = AppConstTabStyleMode

  const {
    scrollRef,
    onTabClick,
    onTabRemove,
    onOpenCtxMenu,
    onCloseCtxMenu,
    onOpenDevTool,
    timeoutId,
    ctxMenuShow,
    currentMouseTab,
    currentMouseTabIndex,
    setItemRef,
    startBounce,
    stopBounce,
  } = getTabsContext()

  const onOpenContextMenu = (e: MouseEvent, item: AppTab, index: number) => {
    currentMouseTab.value = item
    currentMouseTabIndex.value = index

    // clear time out id for devTool when open ctxMenu
    clearTimeout(timeoutId.value!)

    // open ctx menu
    onOpenCtxMenu(e)
  }

  const onMouseEnter = (e: MouseEvent, item: AppTab, index: number) => {
    // open devtool
    onOpenDevTool(e, item, index, ctxMenuShow.value)

    // start bounce
    if (
      !appSetting.settings.tab.showIcon &&
      !appAdapter.isMobile &&
      !item.meta.affix &&
      item.name === currentRoute.value.name
    ) {
      startBounce()
    }
  }

  const onMouseLeave = (item: AppTab) => {
    // clear the setTimeout for devTool when mouse leave
    clearTimeout(timeoutId.value!)

    // stop bounce
    if (
      !appSetting.settings.tab.showIcon &&
      !appAdapter.isMobile &&
      !item.meta.affix &&
      currentMouseTab.value?.name === currentRoute.value.name
    ) {
      stopBounce()
    }
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

  watchEffect(() => {
    nextTick(() => {
      // tab sortable
      useTabsSortable(appSetting.settings.tab.sortable)
    })
  })
</script>
