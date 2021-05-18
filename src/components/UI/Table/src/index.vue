<script lang="tsx">
  import type { WTable } from './types'

  import { ref, unref, computed, defineComponent, renderList } from 'vue'
  import { easyOmit, genString } from 'easy-fns-ts'

  import props, { extendPropKeys } from './props'

  import { setTableContext } from './hooks/useTableContext'
  import { useTableHeaders } from './hooks/useTableHeaders'
  import { useTableComponent } from './hooks/useTableComponents'
  import { useTablePagination } from './hooks/useTablePagination'
  import { useTableMethods } from './hooks/useTableMethods'
  import { useProps } from '/@/hooks/core/useProps'
  import { renderSlots } from '/@/utils/shared'

  export default defineComponent({
    name: 'WTable',

    inheritAttrs: false,

    props: props,

    emits: ['hook', 'page', 'action', 'edit'],

    setup(props: WTable.Props, ctx) {
      const tableId = `w-table-${genString(6)}`

      const { attrs, emit, expose, slots } = ctx

      const tableRef = ref<Nullable<any>>(null)

      const { setProps, getProps } = useProps<WTable.Props>(props)

      useTableComponent()

      const { tableHeaders } = useTableHeaders(getProps)

      const { tableMethods } = useTableMethods(tableRef, { setProps })

      const { onPageChange, pageState } = useTablePagination(getProps, emit)

      const getBindValue = computed(() => {
        return {
          ...attrs,
          // omit custom props
          ...easyOmit(unref(getProps), extendPropKeys),
        }
      })

      // create `WTable` context
      setTableContext({
        tableProps: getProps,
        tableHeaders: tableHeaders,
        tableRef: tableRef,
        tableId: tableId,
        emitEvents: {
          action: (...args) => emit('action', ...args),
          edit: (...args) => emit('edit', ...args),
        },
      })

      // create `useTable` hook
      emit('hook', tableMethods)

      // expose
      // useExpose({
      //   apis: formMethods,
      //   expose,
      // })

      // render table column
      const renderTableItem = () =>
        renderList(tableHeaders.value, (value) => (
          <w-table-column item={value} key={genString(8)}>
            {renderSlots(slots)}
          </w-table-column>
        ))

      // render table
      const renderTable = () => {
        const renderHeader = () =>
          getProps.value.hasSettings && (
            <w-table-extend-settings></w-table-extend-settings>
          )

        // render pagination
        const renderPage = () =>
          getProps.value.hasPage && (
            <w-pagination
              {...pageState}
              onChange={onPageChange}
              class="mt-4 flex justify-end"
            ></w-pagination>
          )

        return (
          <div id={tableId}>
            {renderHeader()}

            <el-table ref={tableRef} {...getBindValue.value}>
              {renderTableItem()}
            </el-table>

            {renderPage()}
          </div>
        )
      }

      return () => renderTable()
    },
  })
</script>
