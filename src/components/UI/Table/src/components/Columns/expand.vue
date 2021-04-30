<script lang="tsx">
  import type { ElTableColumnProps } from '../../types'
  import { defineComponent, renderSlot } from 'vue'
  import { useTableContext } from '../../hooks/useTableContext'

  export default defineComponent({
    name: 'WTableColumnExpand',

    inheritAttrs: false,

    setup(_, ctx) {
      const { slots } = ctx
      const { tableProps } = useTableContext()

      // render expand slot
      const renderDefaultSlot = () => ({
        default: (scope: Recordable) => renderSlot(slots, 'default', scope),
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
          tableProps.value.hasExpand && (
            <el-table-column {...defaultProps}>
              {renderDefaultSlot()}
            </el-table-column>
          )
        )
      }
    },
  })
</script>

<style lang="scss" scoped></style>
