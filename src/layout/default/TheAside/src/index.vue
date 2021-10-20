<template>
  <n-layout-sider
    :width="240"
    :collapsed-width="60"
    bordered
    show-trigger="bar"
    collapse-mode="width"
    :collapsed="app.collapse"
    @update:collapsed="onUpdateCollapse"
    inverted
  >
    <div class="select-none">
      <AsideLogo />

      <AsideMenu />
    </div>
  </n-layout-sider>
</template>

<script lang="ts" setup>
  import AsideMenu from './menu.vue'
  import AsideLogo from './logo.vue'

  const { app } = useAppContext()

  const onUpdateCollapse = (collapse: boolean) => {
    app.value.collapse = collapse
  }
</script>
