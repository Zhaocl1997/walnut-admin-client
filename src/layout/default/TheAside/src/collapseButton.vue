<template>
  <w-button
    type="info"
    text
    size="large"
    class="absolute bottom-0 w-full bg-base-color py-1"
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
  ></w-button>
</template>

<script lang="ts" setup>
  const appMenu = useAppStoreMenu()
  const appSettings = useAppStoreSetting()

  const onToogleCollapse = () => {
    appMenu.setCollapse(!appMenu.collapse)
  }
</script>
