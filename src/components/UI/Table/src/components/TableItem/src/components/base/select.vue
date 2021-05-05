<script lang="tsx">
  import type { ElTableColumnProps } from '/@/components/UI/Table'

  import { defineComponent } from 'vue'
  import { useTableContext } from '/@/components/UI/Table/src/hooks/useTableContext'

  export default defineComponent({
    name: 'WTableColumnSelect',

    inheritAttrs: false,

    setup() {
      const { tableProps } = useTableContext()

      return () => {
        const defaultProps: Partial<ElTableColumnProps> = {
          key: 'select',
          type: 'selection',
          width: '50',
          align: 'center',
          fixed: 'left',
          selectable: tableProps.value.selectable,
          reserveSelection: tableProps.value.reserveSelection,
        }

        return <el-table-column {...defaultProps}></el-table-column>
      }
    },
  })
</script>
