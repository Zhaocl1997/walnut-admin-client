<template>
  <n-popover
    title="This will only appear in dev mode."
    :show="devToolShow && !currentMouseTab?.meta.url"
    :show-arrow="false"
    :x="devToolX"
    :y="devToolY"
    :on-clickoutside="() => (devToolShow = false)"
  >
    <template #header>
      <n-text strong depth="1">This will only appear in dev mode.</n-text>
    </template>

    <n-list>
      <n-list-item>
        <w-JSON :value="currentMouseTab" height="auto" />
      </n-list-item>

      <n-list-item>
        <n-button @click="onOpenFile">
          Open vue file related to this tab in
          <span class="text-red-500">&ensp;VScode</span>
        </n-button>
      </n-list-item>
    </n-list>
  </n-popover>
</template>

<script lang="ts" setup>
  import { getTabsContext } from '../hooks/useTabsContext'

  const { devToolX, devToolY, currentMouseTab, devToolShow, onOpenFile } =
    getTabsContext()
</script>
