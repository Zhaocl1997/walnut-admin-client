<script lang="tsx">
  import type { ElTableColumnProps } from '../../types'

  import { defineComponent } from 'vue'
  import { useTableContext } from '../../hooks/useTableContext'

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

        return (
          tableProps.value.hasSelect && (
            <el-table-column {...defaultProps}></el-table-column>
          )
        )
      }
    },
  })
</script>
