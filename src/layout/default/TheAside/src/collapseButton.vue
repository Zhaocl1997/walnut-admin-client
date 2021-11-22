<template>
  <w-button
    type="info"
    text
    class="absolute bottom-0 w-full bg-base-color"
    :style="{ backgroundColor: 'var(--inverted-color)' }"
    :icon="
      appMemo.collapse
        ? 'ant-design:double-right-outlined'
        : 'ant-design:double-left-outlined'
    "
    @click="() => (appMemo.collapse = !appMemo.collapse)"
  ></w-button>
</template>

<script lang="ts" setup>
  const { appMemo } = useAppState()
</script>
