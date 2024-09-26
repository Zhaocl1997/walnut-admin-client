<script lang="ts" setup>
const appMenu = useAppStoreMenu()
const appSettings = useAppStoreSetting()

function onToogleCollapse() {
  appMenu.setCollapse(!appMenu.collapse)
}
</script>

<template>
  <WButton
    type="info"
    text
    size="large"
    class="bg-base-color absolute bottom-0 w-full py-1"
    :style="{
      backgroundColor: appSettings.menu.inverted
        ? 'var(--inverted-color)'
        : 'transparent',
    }"
    :icon="
      appMenu.collapse
        ? 'ant-design:double-right-outlined'
        : 'ant-design:double-left-outlined'
    "
    @click="onToogleCollapse"
  />
</template>
