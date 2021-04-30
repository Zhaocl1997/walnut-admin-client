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
    <WTableColumnExpand>
      <template #default="scope">
        <slot name="expand" v-bind="scope"></slot>
      </template>
    </WTableColumnExpand>

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
  import type { WTableProps } from './types'

  import { ref, unref, computed, defineComponent } from 'vue'

  import props from './props'

  import { setTableContext } from './hooks/useTableContext'
  import { useTableHeaders } from './hooks/useTableHeaders'
  import { useTableComponent } from './hooks/useTableComponents'
  import { useTablePagination } from './hooks/useTablePagination'
  import { useTableMethods } from './hooks/useTableMethods'
  import { useProps } from '/@/hooks/core/useProps'

  export default defineComponent({
    name: 'WTable',

    inheritAttrs: false,

    props: props,

    emits: ['hook', 'page'],

    setup(props: WTableProps, ctx) {
      const { attrs, emit, expose } = ctx

      const tableRef = ref<Nullable<any>>(null)

      const { setProps, getProps } = useProps<WTableProps>(props)

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
      setTableContext({
        tableProps: getProps,
      })

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
