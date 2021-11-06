<template>
  <w-button
    type="info"
    text
    class="absolute bottom-0 w-full bg-base-color"
    :style="{ backgroundColor: 'var(--inverted-color)' }"
    :icon="
      app.collapse
        ? 'ant-design:double-right-outlined'
        : 'ant-design:double-left-outlined'
    "
    @click="() => (app.collapse = !app.collapse)"
  ></w-button>
</template>

<script lang="ts" setup>
  const { app } = useAppState()
</script>
