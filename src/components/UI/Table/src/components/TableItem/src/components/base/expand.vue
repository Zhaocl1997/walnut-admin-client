<script lang="tsx">
  import type {
    ElTableColumnProps,
    ElTableColumnScopedSlot,
  } from '/@/components/UI/Table'
  import { defineComponent, renderSlot } from 'vue'
  import { useTableContext } from '/@/components/UI/Table/src/hooks/useTableContext'

  export default defineComponent({
    name: 'WTableColumnExpand',

    inheritAttrs: false,

    setup(_, ctx) {
      const { slots } = ctx
      const { tableProps } = useTableContext()

      // render expand slot
      const renderDefaultSlot = () => ({
        default: (scope: ElTableColumnScopedSlot) =>
          renderSlot(slots, 'default', scope),
      })

      return () => {
        const defaultProps: Partial<ElTableColumnProps> = {
          key: 'expand',
          type: 'expand',
          width: '50',
          align: 'center',
          fixed: 'left',
        }

        return (
          <el-table-column {...defaultProps}>
            {renderDefaultSlot()}
          </el-table-column>
        )
      }
    },
  })
</script>

<style lang="scss" scoped></style>
