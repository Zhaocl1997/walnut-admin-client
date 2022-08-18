<template>
  <div class="hstack space-x-2 children:cursor-pointer">
    <w-a-icon
      icon="ant-design:sync-outlined"
      height="20"
      @click="onApiTableList"
      :disabled="tableProps.loading"
      :help-message="t('app.base.refresh')"
    ></w-a-icon>

    <WTableSettingsColumns />
  </div>
</template>

<script lang="ts" setup>
  import WTableSettingsColumns from './settings/columns.vue'
  import { useTableContext } from '../hooks/useTableContext'

  const { t } = useAppI18n()
  const { onApiTableList, tableProps } = useTableContext()
</script>
