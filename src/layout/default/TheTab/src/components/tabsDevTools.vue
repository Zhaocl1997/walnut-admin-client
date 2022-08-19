<template>
  <n-popover
    title="This will only appear in dev mode."
    :show="devToolShow"
    :show-arrow="false"
    :x="devToolX"
    :y="devToolY"
    :on-clickoutside="() => (devToolShow = false)"
  >
    <template #header>
      <n-text strong depth="1">This will only appear in dev mode.</n-text>
    </template>

    <w-JSON :value="currentMouseTab" height="auto"></w-JSON>

    <n-button v-show="!currentMouseTab?.meta.url" @click="onOpenFile">
      Open vue file related to this tab in
      <span class="text-red-500">&ensp;VS Code</span>
    </n-button>
  </n-popover>
</template>

<script lang="ts" setup>
  import { getTabsContext } from '../hooks/useTabsContext'

  const { devToolX, devToolY, currentMouseTab, devToolShow, onOpenFile } =
    getTabsContext()
</script>
