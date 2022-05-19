<template>
  <w-icon
    :icon="
      appMenu.collapse
        ? 'ant-design:menu-fold-outlined'
        : 'ant-design:menu-unfold-outlined'
    "
    @click="onClick"
    width="24"
    class="cursor-pointer"
  ></w-icon>
</template>

<script lang="ts" setup>
  const appMenu = useAppMenuStore()
  const appAdapter = useAppAdapterStore()

  const onClick = () => {
    if (appAdapter.isMobile) {
      appMenu.setShowAside(!appMenu.showAside)
      appMenu.setCollapse(false)
    } else {
      appMenu.setCollapse(!appMenu.collapse)
    }
  }
</script>
