<script lang="ts" setup>
const appSetting = useAppStoreSetting()
const appMenu = useAppStoreMenu()
const appAdapter = useAppStoreAdapter()

function onClick() {
  if (appAdapter.isMobile) {
    appMenu.setShowAside(!appMenu.showAside)
    appMenu.setCollapse(false)
  }
  else {
    appMenu.setCollapse(!appMenu.collapse)
  }
}
</script>

<template>
  <w-transition appear name="slide-up">
    <WIcon
      v-if="appSetting.getMenuCollapseIconStatus"
      :icon="
        appMenu.collapse
          ? 'ant-design:menu-fold-outlined'
          : 'ant-design:menu-unfold-outlined'
      "
      width="24"
      class="cursor-pointer"
      @click="onClick"
    />
  </w-transition>
</template>
