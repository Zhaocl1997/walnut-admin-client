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
        @mouseenter="onOpenDevTool(item)"
        :data-affix="item.meta.affix"
      >
        <div
          v-if="
            !app.isMobile && !tabSettings.showIcon && $route.name === item.name
          "
          class="bg-primary hover:bg-primaryHover rounded-full h-4 w-4"
          :data-affix="item.meta.affix"
        ></div>

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
  import { getTabsContext } from '../hooks/useTabsContext'
  import { useTabsSortable } from '../hooks/useTabsSortable'

  const { t } = useAppI18n()
  const { app, tab, settings } = useAppState()
  const tabSettings = settings.value.ForDevelopers.tab

  const {
    scrollRef,
    onTabClick,
    onTabRemove,
    onOpenCtxMenu,
    onCloseCtxMenu,
    onOpenDevTool,
    timeoutId,
  } = getTabsContext()

  const onOpenContextMenu = (e: MouseEvent, item: AppTab, index: number) => {
    clearTimeout(timeoutId.value!)
    onOpenCtxMenu(e, item, index)
  }

  // middle button close
  const onMouseUp = (e: MouseEvent, name: string) => {
    if (e.button === 1) {
      const isRemoveable = !tab.value.tabs
        .filter((i) => i.meta.affix)
        .map((i) => i.name)
        .includes(name)

      isRemoveable && onTabRemove(name)
    }
  }

  // tab sortable
  watchEffect(() => {
    useTabsSortable(tabSettings.sortable)
  })
</script>
