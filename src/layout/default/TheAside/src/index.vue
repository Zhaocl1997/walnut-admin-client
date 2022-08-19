<template>
  <n-layout-sider
    v-model:collapsed="appMenu.collapse"
    bordered
    collapse-mode="width"
    class="h-screen"
    :width="appSetting.settings.menu.width"
    :collapsed-width="appSetting.settings.menu.collapsedWidth"
    :show-trigger="appSetting.getShowMenuCollapseBuiltIn"
    :inverted="appSetting.settings.menu.inverted"
    :native-scrollbar="false"
  >
    <div class="select-none overflow-hidden">
      <w-transition appear name="slide-left">
        <AsideLogo
          v-if="appSetting.settings.app.showLogo"
          :class="[{ fixed: appSetting.settings.app.fixLogo }]"
        ></AsideLogo>
      </w-transition>

      <w-transition appear name="slide-left">
        <AsideMenu
          v-if="appSetting.settings.app.showMenu"
          :class="[
            'transition-all',
            {
              'pb-6': appSetting.getShowMenuCollapseButton,
              absolute: appSetting.settings.app.fixLogo,
            },
          ]"
          :style="{
            paddingTop:
              (appSetting.settings.app.showLogo &&
              appSetting.settings.app.fixLogo
                ? appSetting.settings.header.height
                : 0) + 'px',
          }"
        ></AsideMenu>
      </w-transition>

      <MenuCollpaseButton
        v-if="appSetting.getShowMenuCollapseButton"
      ></MenuCollpaseButton>
    </div>
  </n-layout-sider>
</template>

<script lang="ts" setup>
  import AsideMenu from './menu.vue'
  import AsideLogo from './logo.vue'
  import MenuCollpaseButton from './collapseButton.vue'

  const appMenu = useAppStoreMenu()
  const appSetting = useAppStoreSetting()
</script>
