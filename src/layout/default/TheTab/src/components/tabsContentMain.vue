<template>
  <w-scrollbar ref="scrollRef" @scroll="onCloseCtxMenu" vertical>
    <ul class="h-8 flex flex-row flex-nowrap">
      <li
        v-for="(tab, index) in getTabs"
        :class="[
          'flex flex-nowrap items-center space-x-1 bg-primary bg-opacity-100 w-auto border border-solid border-blue-500 rounded-md shadow mx-0.5 px-2 my-1 select-none cursor-pointer',
          {
            'text-blue-700 bg-secondary': $route.name === tab.name,
            'hover:text-blue-600 hover:bg-secondary': $route.name !== tab.name,
          },
        ]"
        @click="onTabClick(tab.name)"
        @contextmenu.prevent.native="onCtxMenu($event, tab.name, index)"
      >
        <!-- active symbol -->
        <div
          v-show="$route.name === tab.name"
          class="border-8 border-solid border-blue-500 rounded-full h-4 w-4 hover:border-blue-700"
        ></div>

        <!-- title -->
        <span class="whitespace-nowrap font-sans text-sm text-primary">{{
          getMaybeI18nMsg(tab.meta.title)
        }}</span>

        <!-- close icon -->
        <div>
          <i
            v-show="tab.name !== indexName"
            class="el-icon-close text-primary hover:bg-orange-400 rounded-full transform hover:scale-110 hover:opacity-80"
            @click.prevent.stop="onTabRemove(tab.name)"
          ></i>
        </div>
      </li>
    </ul>
  </w-scrollbar>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { getMaybeI18nMsg } from '/@/locales/utils'
  import { indexName } from '/@/router/constant'

  import { getTabsContext } from '../hooks/useTabsContext'

  export default defineComponent({
    name: 'TabsScroll',

    inheritAttrs: false,

    setup() {
      const {
        scrollRef,
        getTabs,
        onTabClick,
        onTabRemove,
        onCtxMenu,
        onCloseCtxMenu,
      } = getTabsContext()

      return {
        getMaybeI18nMsg,
        indexName,
        scrollRef,
        getTabs,
        onTabClick,
        onTabRemove,
        onCtxMenu,
        onCloseCtxMenu,
      }
    },
  })
</script>

<style lang="scss" scoped></style>
