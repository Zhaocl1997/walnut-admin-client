<template>
  <div class="hstack space-x-2 children:cursor-pointer">
    <n-tooltip trigger="hover">
      {{ t('app:base:refresh') }}
      <template #trigger>
        <n-button text>
          <w-icon
            icon="ant-design:sync-outlined"
            height="20"
            @click="onApiTableList"
            :disabled="tableProps.loading"
          ></w-icon
        ></n-button>
      </template>
    </n-tooltip>

    <WTableSettingsColumns />
  </div>
</template>

<script lang="ts" setup>
  import WTableSettingsColumns from './settings/columns.vue'
  import { useTableContext } from '../hooks/useTableContext'

  const { t } = useAppI18n()
  const { onApiTableList, tableProps } = useTableContext()
</script>
