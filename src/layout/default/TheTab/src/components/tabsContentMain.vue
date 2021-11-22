<template>
  <w-scrollbar
    ref="scrollRef"
    @scroll="onCloseCtxMenu"
    vertical
    :height="settings.ForDevelopers.tab.height + 'px'"
  >
    <ul id="tabSortable" class="*hstack">
      <li
        v-for="(item, index) in tab.tabs"
        :key="item.name"
        :class="[
          '*hstack cursor-pointer items-center w-auto select-none space-x-1 shadow mx-0.5 px-2 p-px',
          {
            'text-primary hover:text-primaryHover': $route.name === item.name,
            /* card */
            'border border-gray-400 hover:(border-primaryHover text-primaryHover)':
              tabSettings.styleMode === 'card',
            'border-primary':
              $route.name === item.name && tabSettings.styleMode === 'card',

            /* flex */
            'bg-green-50 bg-opacity-5 hover:(bg-green-100 bg-opacity-10)':
              tabSettings.styleMode === 'flex',
            'bg-green-200 bg-opacity-10 border-b-2 border-primary':
              $route.name === item.name && tabSettings.styleMode === 'flex',

            /* round */
            'bg-green-50 bg-opacity-5 hover:(bg-green-100 bg-opacity-10) rounded-t-xl':
              tabSettings.styleMode === 'round',
            'bg-green-200 bg-opacity-10 border-l-1 border-primary':
              $route.name === item.name && tabSettings.styleMode === 'round',
          },
        ]"
        @click="onTabClick(item.name)"
        @mouseup="onMouseUp($event, item.name)"
        @contextmenu.prevent.native="onOpenContextMenu($event, item, index)"
        @mouseenter="onMouseEnter($event, item, index)"
        @mouseleave="onMouseLeave(index)"
        :data-affix="item.meta.affix"
      >
        <TabDot
          :ref="setItemRef"
          v-if="
            !appMemo.isMobile &&
            !tabSettings.showIcon &&
            $route.name === item.name
          "
          :data-affix="item.meta.affix"
        ></TabDot>

        <w-icon
          v-if="tabSettings.showIcon"
          :icon="item.meta.icon"
          height="16"
        ></w-icon>

        <span
          class="app-text text-sm whitespace-nowrap"
          :data-affix="item.meta.affix"
        >
          {{ t(item.meta.title!)  }}
        </span>

        <w-icon
          v-if="!item.meta.affix"
          icon="ant-design:close-outlined"
          width="12"
          class="hover:text-error hover:scale-125 rounded-full transform"
          @click.prevent.stop="onTabRemove(item.name)"
        ></w-icon>
      </li>
    </ul>
  </w-scrollbar>
</template>

<script lang="ts" setup>
  import TabDot from './dot'
  import { getTabsContext } from '../hooks/useTabsContext'
  import { useTabsSortable } from '../hooks/useTabsSortable'

  const { t } = useAppI18n()
  const { currentRoute } = useAppRouter()
  const { app, appMemo, tab, settings } = useAppState()
  const tabSettings = settings.value.ForDevelopers.tab

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
    if (item.name === currentRoute.value.name) startBounce()
  }

  const onMouseLeave = (index: number) => {
    // clear the setTimeout for devTool when mouse leave
    clearTimeout(timeoutId.value!)

    // stop bounce
    if (currentMouseTab.value?.name === currentRoute.value.name) stopBounce()
  }

  const onMouseUp = (e: MouseEvent, name: string) => {
    // middle button close
    // 1 stands for mouse middle button
    if (e.button === 1) {
      const isRemoveable = !tab.value.tabs
        .filter((i) => i.meta.affix)
        .map((i) => i.name)
        .includes(name)

      isRemoveable && onTabRemove(name)
    }
  }

  watchEffect(() => {
    // tab sortable
    useTabsSortable(tabSettings.sortable)
  })
</script>
