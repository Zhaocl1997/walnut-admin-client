<template>
  <n-layout-sider
    :width="settings.ForDevelopers.menu.width"
    :collapsed-width="settings.ForDevelopers.menu.collapsedWidth"
    :show-trigger="getShowMenuCollapseBuiltIn"
    bordered
    collapse-mode="width"
    :collapsed="app.collapse"
    @update:collapsed="onUpdateCollapse"
    inverted
    :native-scrollbar="false"
    class="h-screen"
  >
    <div class="select-none overflow-hidden">
      <AsideLogo
        v-if="appSettings.showLogo"
        :class="{ fixed: appSettings.fixLogo }"
      />

      <AsideMenu
        v-if="appSettings.showMenu"
        :class="[
          { 'pb-6': getShowMenuCollapseButton, absolute: appSettings.fixLogo },
        ]"
        :style="{
          paddingTop:
            (appSettings.fixLogo ? settings.ForDevelopers.header.height : 0) +
            'px',
        }"
      />

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

  const { app, settings } = useAppState()
  const appSettings = settings.value.ForDevelopers.app

  const onUpdateCollapse = (collapse: boolean) => {
    app.value.collapse = collapse
  }
</script>
