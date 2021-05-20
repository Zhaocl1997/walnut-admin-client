<script lang="tsx">
  import type { WTable } from './types'

  import { ref, unref, computed, defineComponent, renderList } from 'vue'
  import { easyOmit, genString } from 'easy-fns-ts'

  import { useProps } from '/@/hooks/core/useProps'
  import { renderSlots } from '/@/utils/shared'

  import { setTableContext } from './hooks/useTableContext'
  import { useTableHeaders } from './hooks/useTableHeaders'
  import { useTableComponent } from './hooks/useTableComponents'
  import { useTablePagination } from './hooks/useTablePagination'
  import { useTableMethods } from './hooks/useTableMethods'
  import { useTableEvents } from './hooks/useTableEvents'

  import props, { extendPropKeys } from './props'

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

      const { tableEvent } = useTableEvents(getProps, emit)

      const { tableMethods } = useTableMethods(tableRef, { setProps })

      const { pageState } = useTablePagination(getProps, emit)

      const getBindValue = computed(() => {
        return {
          ...attrs,
          // omit custom props
          ...easyOmit(unref(getProps), extendPropKeys),
        }
      })

      // create `WTable` context
      setTableContext({
        tableId: tableId,
        tableRef: tableRef,
        tableProps: getProps,
        tableHeaders: tableHeaders,
        tableEvent: tableEvent,
        tablePageState: pageState,
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
            <w-table-extend-pagination></w-table-extend-pagination>
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
