<template>
  <w-icon
    :icon="
      appMemo.collapse
        ? 'ant-design:menu-fold-outlined'
        : 'ant-design:menu-unfold-outlined'
    "
    @click="onClick"
    width="24"
    class="cursor-pointer"
  ></w-icon>
</template>

<script lang="ts" setup>
  const { appMemo } = useAppState()

  const onClick = () => {
    if (appMemo.value.isMobile) {
      appMemo.value.showAside = !appMemo.value.showAside
      appMemo.value.collapse = false
    } else {
      appMemo.value.collapse = !appMemo.value.collapse
    }
  }
</script>
