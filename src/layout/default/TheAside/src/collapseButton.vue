<template>
  <w-button
    type="info"
    text
    size="large"
    class="absolute bottom-0 w-full bg-base-color py-1"
    :style="{ backgroundColor: 'var(--inverted-color)' }"
    :icon="
      appMenu.collapse
        ? 'ant-design:double-right-outlined'
        : 'ant-design:double-left-outlined'
    "
    @click="onToogleCollapse"
  ></w-button>
</template>

<script lang="ts" setup>
  const appMenu = useAppMenuStore()

  const onToogleCollapse = () => {
    appMenu.setCollapse(!appMenu.collapse)
  }
</script>
