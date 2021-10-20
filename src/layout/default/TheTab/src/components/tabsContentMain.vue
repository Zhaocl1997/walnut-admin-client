<template>
  <w-scrollbar ref="scrollRef" @scroll="onCloseCtxMenu" vertical height="2rem">
    <ul class="*hstack">
      <li
        v-for="(tab, index) in getTabs"
        :class="[
          '*hstack space-x-1 items-center w-auto border border-solid border-blue-500 rounded-md shadow mx-0.5 px-2 p-px select-none cursor-pointer all:hover:inline-block',
          {
            'text-primary hover:text-primaryHover': $route.name === tab.name,
          },
        ]"
        @click="onTabClick(tab.name)"
        @contextmenu.prevent.native="onCtxMenu($event, tab.name, index)"
      >
        <div
          v-show="!app.isMobile && $route.name === tab.name"
          class="bg-primary hover:bg-primaryHover rounded-full h-4 w-4"
        ></div>

        <span class="app-text text-sm whitespace-nowrap">{{
          t(tab.meta.title!)
        }}</span>

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

  const { t } = useAppI18n()
  const { app } = useAppContext()

  // TODO menu data and tab redo
  const {
    scrollRef,
    getTabs,
    onTabClick,
    onTabRemove,
    onCtxMenu,
    onCloseCtxMenu,
  } = getTabsContext()
</script>
