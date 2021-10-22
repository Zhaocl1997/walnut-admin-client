<template>
  <w-scrollbar ref="scrollRef" @scroll="onCloseCtxMenu" vertical height="2rem">
    <ul id="tabSortable" class="*hstack">
      <li
        v-for="(tab, index) in tab.tabs"
        :key="tab.name"
        :class="[
          'tab-li *hstack space-x-1 items-center w-auto border border-solid border-blue-500 rounded-md shadow mx-0.5 px-2 p-px select-none cursor-pointer all:hover:inline-block',
          {
            'text-primary hover:text-primaryHover': $route.name === tab.name,
          },
        ]"
        @click="onTabClick(tab.name)"
        @contextmenu.prevent.native="onOpenCtxMenu($event, tab, index)"
        :data-affix="tab.meta.affix"
      >
        <div
          v-show="!app.isMobile && $route.name === tab.name"
          class="bg-primary hover:bg-primaryHover rounded-full h-4 w-4"
          :data-affix="tab.meta.affix"
        ></div>

        <span
          class="app-text text-sm whitespace-nowrap"
          :data-affix="tab.meta.affix"
        >
          {{ t(tab.meta.title!)  }}
        </span>

        <w-transition name="zoom-out">
          <w-icon
            v-if="!tab.meta.affix"
            icon="ant-design:close-outlined"
            width="12"
            class="hover:text-error hover:scale-110 rounded-full transform"
            @click.prevent.stop="onTabRemove(tab.name)"
          ></w-icon>
        </w-transition>
      </li>
    </ul>
  </w-scrollbar>
</template>

<script lang="ts" setup>
  import { getTabsContext } from '../hooks/useTabsContext'
  import { useTabsSortable } from '../hooks/useTabsSortable'

  const { t } = useAppI18n()
  const { app, tab } = useAppState()

  const { scrollRef, onTabClick, onTabRemove, onOpenCtxMenu, onCloseCtxMenu } =
    getTabsContext()

  useTabsSortable()
</script>
