<template>
  <n-modal v-if="getShowDevTools" v-model:show="devToolShow">
    <n-card style="width: 600px" role="dialog" aria-modal="true">
      <w-JSON :value="currentMouseTab" height="auto"></w-JSON>

      <n-button v-show="!currentMouseTab?.meta.url" @click="onOpenFile">
        Open vue file related to this tab in
        <span class="text-red-500">&ensp;VS Code</span>
      </n-button>
    </n-card>
  </n-modal>
</template>

<script lang="ts" setup>
  import { getTabsContext } from '../hooks/useTabsContext'

  const appAdapter = useAppStoreAdapter()

  const getShowDevTools = computed(() => isDev() && !appAdapter.isMobile)

  const { currentMouseTab, devToolShow, onOpenFile } = getTabsContext()
</script>
