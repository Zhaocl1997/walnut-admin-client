<template>
  <w-icon
    :icon="
      app.collapse
        ? 'ant-design:menu-fold-outlined'
        : 'ant-design:menu-unfold-outlined'
    "
    @click="onClick"
    width="24"
    class="cursor-pointer"
  ></w-icon>
</template>

<script lang="ts" setup>
  const { app } = useAppState()

  const onClick = () => {
    if (app.value.isMobile) {
      app.value.showAside = !app.value.showAside
      app.value.collapse = false
    } else {
      app.value.collapse = !app.value.collapse
    }
  }
</script>
