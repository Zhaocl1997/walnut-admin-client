<script lang="ts" setup>
import { useTableContext } from '../hooks/useTableContext'
import WTableSettingsColumns from './settings/columns.vue'

const { t } = useAppI18n()
const { onApiTableList, tableProps } = useTableContext()
</script>

<template>
  <div class="hstack space-x-2 children:cursor-pointer">
    <w-a-icon
      icon="ant-design:sync-outlined"
      height="20"
      :disabled="tableProps.loading"
      :help-message="t('app.base.refresh')"
      @click="onApiTableList"
    />

    <WTableSettingsColumns />
  </div>
</template>
