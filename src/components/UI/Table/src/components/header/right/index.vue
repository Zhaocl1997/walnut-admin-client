<script lang="ts" setup>
import { useTableContext } from '../../../hooks/useTableContext'
import TableHeaderRightColumns from './columns.vue'
import TableHeaderRightPolling from './polling.vue'

defineOptions({
  name: 'WTableHeaderRight',
})

const { onApiTableList, tableProps } = useTableContext()
</script>

<template>
  <div class="hstack children:cursor-pointer space-x-2">
    <w-a-icon
      v-if="!tableProps.polling" icon="ant-design:reload-outlined" height="20" :disabled="tableProps.loading"
      :help-message="$t('app.base.refresh')" @click="onApiTableList"
    />

    <TableHeaderRightPolling v-if="tableProps.polling" />

    <TableHeaderRightColumns />
  </div>
</template>
