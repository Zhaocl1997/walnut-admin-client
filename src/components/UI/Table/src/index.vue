<script lang="tsx">
  import type { ElTableColumnScopedSlot, WTableProps } from './types'

  import {
    ref,
    unref,
    computed,
    defineComponent,
    renderSlot,
    renderList,
  } from 'vue'

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

    emits: ['hook', 'page', 'action'],

    setup(props: WTableProps, ctx) {
      const { attrs, emit, expose, slots } = ctx

      const tableRef = ref<Nullable<any>>(null)

      const { setProps, getProps } = useProps<WTableProps>(props)

      useTableComponent()

      const { tableHeaders } = useTableHeaders(getProps)

      const { tableMethods } = useTableMethods(tableRef, { setProps })

      const { onPageChange, pageState } = useTablePagination(getProps, emit)

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
        emitEvents: { action: (...args) => emit('action', ...args) },
      })

      // create `useTable` hook
      emit('hook', tableMethods)

      // expose
      // useExpose({
      //   apis: formMethods,
      //   expose,
      // })

      // render table column
      const renderTableItem = () => {
        // render column slot
        const renderColumnsSlot = () => {
          const ret = {}
          Object.keys(slots).map((slotName) => {
            ret[slotName] = (scope: ElTableColumnScopedSlot) =>
              renderSlot(slots, slotName, scope)
          })
          return ret
        }

        return renderList(tableHeaders.value, (value) => (
          <w-table-item item={value}>{renderColumnsSlot()}</w-table-item>
        ))
      }

      // render table
      const renderTable = () => {
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
          <>
            <el-table ref={tableRef} {...getBindValue.value}>
              {renderTableItem()}
            </el-table>

            {renderPage()}
          </>
        )
      }

      return () => renderTable()
    },
  })
</script>
