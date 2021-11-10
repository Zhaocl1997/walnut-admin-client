<template>
  <n-modal
    v-model:show="devToolShow"
    preset="dialog"
    type="warning"
    title=" This will only appear in dev mode"
  >
    <n-list>
      <n-list-item>
        <w-JSON :value="currentMouseTab" height="300" />
      </n-list-item>

      <n-list-item>
        <n-button @click="onOpenFile">
          Open vue file related to this tab in
          <span class="text-red-500">&ensp;VSCODE</span>
        </n-button>
      </n-list-item>
    </n-list>
  </n-modal>
</template>

<script lang="tsx" setup>
  import { getTabsContext } from '../hooks/useTabsContext'

  const { currentMouseTab, devToolShow, onOpenFile } = getTabsContext()
</script>
