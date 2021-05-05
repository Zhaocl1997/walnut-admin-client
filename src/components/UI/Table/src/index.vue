<script lang="tsx">
  import type { WTableProps } from './types'

  import { ref, unref, computed, defineComponent, renderSlot } from 'vue'

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
      })

      // create `useTable` hook
      emit('hook', tableMethods)

      // expose
      // useExpose({
      //   apis: formMethods,
      //   expose,
      // })

      // render column slot
      const renderColumnsSlot = () => {
        const ret = {}
        Object.keys(slots).map((slotName) => {
          ret[slotName] = (scope: Recordable) =>
            renderSlot(slots, slotName, scope)
        })
        return ret
      }

      // render table column
      const renderTableItem = () =>
        tableHeaders.value.map((item) => (
          <w-table-item item={item}>{renderColumnsSlot()}</w-table-item>
        ))

      const renderPage = () =>
        props.hasPage && (
          <w-pagination
            {...pageState}
            onChange={onPageChange}
            class="mt-4 flex justify-end"
          ></w-pagination>
        )

      // render table
      const renderTable = () => (
        <>
          <el-table ref={tableRef} {...getBindValue.value}>
            {renderTableItem()}
          </el-table>

          {renderPage()}
        </>
      )

      return () => renderTable()
    },
  })
</script>
