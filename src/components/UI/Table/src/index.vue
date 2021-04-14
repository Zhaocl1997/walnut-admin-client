<template>
  <el-table ref="tableRef" v-bind="getBindValue">
    <WTableItem
      v-for="(header, index) in tableHeaders"
      :key="index"
      :item="header"
    >
      <template
        #[slotName]="data"
        v-for="(slotName, slotIndex) in Object.keys($slots)"
        :key="slotIndex"
      >
        <slot :name="slotName" v-bind="data"></slot>
      </template>
    </WTableItem>

    <WTableColumnIndex />
    <WTableColumnSelect />
    <WTableColumnExpand />
    <WTableColumnAction>
      <template #default="scope">
        <slot name="action" v-bind="scope"></slot>
      </template>
    </WTableColumnAction>
  </el-table>

  <w-pagination
    v-if="hasPage"
    @change="onPageChange"
    v-bind="pageState"
    class="mt-4 flex justify-end"
  ></w-pagination>
</template>

<script lang="ts">
  import type { SetupContext } from 'vue'
  import type { WTableProps } from './types'

  import { ref, unref, computed, defineComponent } from 'vue'

  import props from './props'

  import { useTableContext } from './hooks/useTableContext'
  import { useTableProps } from './hooks/useTableProps'
  import { useTableHeaders } from './hooks/useTableHeaders'
  import { useTableComponent } from './hooks/useTableComponents'
  import { useTablePagination } from './hooks/useTablePagination'
  import { useTableMethods } from './hooks/useTableMethods'

  export default defineComponent({
    name: 'WTable',

    inheritAttrs: false,

    props: props,

    emits: ['hook', 'page'],

    setup(props: WTableProps, ctx: SetupContext) {
      const { attrs, emit, expose } = ctx

      const tableRef = ref<Nullable<any>>(null)

      const { setTableContext } = useTableContext()

      const { setProps, getProps } = useTableProps(props)

      useTableComponent(getProps)

      const { tableHeaders } = useTableHeaders(getProps)

      const { tableMethods } = useTableMethods(tableRef, { setProps })

      const { onPageChange, pageState } = useTablePagination(getProps, ctx)

      const getBindValue = computed(() => {
        return {
          ...attrs,
          // unref the computed props and bind to el-table
          ...unref(getProps),
        }
      })

      // create `WTable` context
      setTableContext(getProps)

      // create `useTable` hook
      emit('hook', tableMethods)

      // expose
      // useExpose({
      //   apis: formMethods,
      //   expose,
      // })

      return {
        tableRef,
        getBindValue,

        onPageChange,
        pageState,

        tableHeaders,
      }
    },
  })
</script>

<style lang="scss" scoped></style>
