<script lang="ts" setup>
import { useTableContext } from '../../../hooks/useTableContext'
import TableHeaderRightColumns from './columns.vue'
import TableHeaderRightPolling from './polling.vue'

const { t } = useAppI18n()
const { onApiTableList, tableProps } = useTableContext()
</script>

<script lang="ts">
export default defineComponent({
  name: 'WTableHeaderRight',
})
</script>

<template>
  <div class="hstack space-x-2 children:cursor-pointer">
    <w-a-icon
      v-if="!tableProps.polling" icon="ant-design:reload-outlined" height="20" :disabled="tableProps.loading"
      :help-message="t('app.base.refresh')" @click="onApiTableList"
    />

    <TableHeaderRightPolling v-if="tableProps.polling" />

    <TableHeaderRightColumns />
  </div>
</template>
