<script lang="tsx">
  import type {
    ElTableColumnScopedSlot,
    WTableEditableColumnDefaultIndex,
  } from '/@/components/UI/Table'
  import type { PropType } from 'vue'

  import { defineComponent } from 'vue'
  import { useTableContext } from '/@/components/UI/Table/src/hooks/useTableContext'

  export default defineComponent({
    name: 'WTableColumnIndex',

    inheritAttrs: false,

    props: {
      column: Object as PropType<WTableEditableColumnDefaultIndex>,
    },

    setup(props) {
      const { tableProps } = useTableContext()

      // render index
      const renderIndex = (i: number) =>
        typeof props.column!.index === 'function'
          ? (tableProps.value.pageNum! - 1) * tableProps.value.pageSize! +
            props.column!.index(i)
          : (tableProps.value.pageNum! - 1) * tableProps.value.pageSize! + i + 1

      // render default index slot
      const renderDefaultSlot = () => ({
        default: ({ $index }: ElTableColumnScopedSlot) => (
          <span>{renderIndex(+$index)}</span>
        ),
      })

      return () => (
        <el-table-column {...props.column}>
          {renderDefaultSlot()}
        </el-table-column>
      )
    },
  })
</script>
