<script lang="ts" setup>
import MenuCollpaseButton from './collapseButton.vue'
import AsideLogo from './logo.vue'
import AsideMenu from './menu.vue'

const appMenu = useAppStoreMenu()
const appSetting = useAppStoreSetting()
</script>

<template>
  <n-layout-sider
    v-model:collapsed="appMenu.collapse"
    bordered
    collapse-mode="width"
    class="h-screen"
    :width="appSetting.menu.width"
    :collapsed-width="appSetting.menu.collapsedWidth"
    :show-trigger="appSetting.getMenuCollapseBuiltInStatus"
    :inverted="appSetting.getMenuInverted"
    :native-scrollbar="false"
  >
    <div class="select-none overflow-hidden">
      <AsideLogo />

      <AsideMenu />

      <MenuCollpaseButton
        v-if="appSetting.getMenuCollapseButtonStatus"
      />
    </div>
  </n-layout-sider>
</template>
