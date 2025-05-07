<script lang="ts" setup>
import { useTableContext } from '../../../hooks/useTableContext'
import TableHeaderRightColumns from './columns.vue'
import TableHeaderRightPolling from './polling.vue'

defineOptions({
  name: 'WTableHeaderRight',
})

const { onApiList, tablePropsCtx } = useTableContext()
const { getProps: tableProps } = tablePropsCtx
</script>

<template>
  <div class="hstack children:cursor-pointer space-x-2">
    <WIconButton
      v-if="!tableProps.polling"
      :icon-props="{ icon: 'ant-design:reload-outlined' }"
      :button-props="{ disabled: tableProps.loading, onClick: onApiList }"
      tooltip
      :tooltip-msg="$t('app.base.refresh')"
    />

    <TableHeaderRightPolling v-if="tableProps.polling" />

    <TableHeaderRightColumns />
  </div>
</template>
