<template>
  <n-layout-sider
    :width="settings.ForDevelopers.menu.width"
    :collapsed-width="settings.ForDevelopers.menu.collapsedWidth"
    :show-trigger="getShowMenuCollapseBuiltIn"
    bordered
    collapse-mode="width"
    :collapsed="appMemo.collapse"
    @update:collapsed="onUpdateCollapse"
    :inverted="settings.ForDevelopers.menu.inverted"
    :native-scrollbar="false"
    class="h-screen"
  >
    <div class="select-none overflow-hidden">
      <w-transition appear name="slide-left">
        <AsideLogo
          v-if="appSettings.showLogo"
          :class="['pl-4', { fixed: appSettings.fixLogo }]"
        />
      </w-transition>

      <w-transition appear name="slide-left">
        <AsideMenu
          v-if="appSettings.showMenu"
          :class="[
            'transition-all',
            {
              'pb-6': getShowMenuCollapseButton,
              absolute: appSettings.fixLogo,
            },
          ]"
          :style="{
            paddingTop:
              (appSettings.showLogo && appSettings.fixLogo
                ? settings.ForDevelopers.header.height
                : 0) + 'px',
          }"
        />
      </w-transition>

      <MenuCollpaseButton v-if="getShowMenuCollapseButton" />
    </div>
  </n-layout-sider>
</template>

<script lang="ts" setup>
  import AsideMenu from './menu.vue'
  import AsideLogo from './logo.vue'
  import MenuCollpaseButton from './collapseButton.vue'
  import {
    getShowMenuCollapseButton,
    getShowMenuCollapseBuiltIn,
  } from '/@/settings'

  const { appMemo, settings } = useAppState()
  const appSettings = settings.value.ForDevelopers.app

  const onUpdateCollapse = (collapse: boolean) => {
    appMemo.value.collapse = collapse
  }
</script>
