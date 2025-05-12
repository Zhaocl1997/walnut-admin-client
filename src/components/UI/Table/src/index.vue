<script lang="ts" setup generic="T">
import type { ICompUITableHooksAPIListParams } from './hooks/useTableAPIListParams'
import type { WTable } from './types'

import { omit } from 'lodash-es'
import TableHeader from './components/header/index.vue'

import QueryForm from './components/queryForm.vue'
import { useTableAPI } from './hooks/useTableAPI'
import { useTableAPIListParams } from './hooks/useTableAPIListParams'
import { useTableColumns } from './hooks/useTableColumns'
import { setTableContext } from './hooks/useTableContext'
import { useTableMethods } from './hooks/useTableMethods'
import { extendedTablePropKeys } from './utils'

defineOptions({
  name: 'WCompUITable',
})

const props = withDefaults(defineProps<WTable.Props<T>>(), {
  // original default
  allowCheckingNotLoaded: false,
  bordered: true,
  bottomBordered: true,
  cascade: true,
  childrenKey: 'children',
  columns: () => [],
  data: () => [],
  defaultCheckedRowKeys: () => [],
  defaultExpandedRowKeys: () => [],
  defaultExpandAll: false,
  filterIconPopoverProps: () => ({
    trigger: 'click',
    placement: 'bottom',
  }),
  flexHeight: false,
  headerHeight: 28,
  indent: 16,
  loading: false,
  minRowHeight: 28,
  paginateSinglePage: true,
  pagination: false,
  paginationBehaviorOnFilter: 'current',
  remote: false,
  singleColumn: false,
  singleLine: true,
  size: 'medium',
  stickyExpandedRows: false,
  striped: false,
  summayPlacement: 'bottom',
  tableLayout: 'auto',
  virtualScroll: false,
  virtualScrollHeader: false,
  virtualScrollX: false,

  // extend
  headerLeftBuiltInActions: () => ([{ _builtInType: 'create' }, { _builtInType: 'delete' }]),
  headerLeftExtraActions: () => ([]),
})

const emits = defineEmits<WTable.Emits<T>>()

// @ts-expect-error 类型“DataTableInst”不满足约束“HTMLElement | Component | SVGElement”。
const tableRef = useTemplateRef<WTable.Inst.NDataTableInst>('tableRef')

const tablePropsCtx = useProps<WTable.Props<T>>(props)

const { setProps, getProps } = tablePropsCtx

const getTableProps = computed(() => omit(getProps.value, extendedTablePropKeys))

const listParams: ICompUITableHooksAPIListParams<T> = useTableAPIListParams()

const tableColumns = useTableColumns(tablePropsCtx, listParams.apiListParams)

const {
  onApiList,
  onApiQuery,
  onApiReset,
  onApiDelete,
  onApiDeleteMany,
  checkedRowKeys,
} = useTableAPI<T>(tableRef, tablePropsCtx, tableColumns, listParams)

const tableMethods = useTableMethods<T>(tableRef)

setTableContext({
  tableRef,
  tableColumns,
  tableEvent: emits,
  tablePropsCtx,

  apiListParams: listParams.apiListParams,
  onApiList,
  onApiQuery,
  onApiReset,

  checkedRowKeys,
})

// expose
defineExpose({
  ...tableMethods,
})

// hook
emits('hook', {
  ...tableMethods,
  setProps,
  onApiList,
  onApiDelete,
  onApiDeleteMany,
  onGetApiListParams: () => listParams.apiListParams.value,
})
</script>

<template>
  <n-card v-if="getProps.queryFormProps" class="mb-2">
    <QueryForm />
  </n-card>

  <n-card>
    <TableHeader />

    <n-data-table
      ref="tableRef"
      v-bind="getTableProps"
      :columns="tableColumns.filter(i => i._internalShow)"
    />
  </n-card>
</template>

<style lang="scss" scoped>

</style>
