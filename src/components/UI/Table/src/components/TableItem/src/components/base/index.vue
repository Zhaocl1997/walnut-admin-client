<script lang="tsx">
  import type {
    ElTableColumnProps,
    ElTableColumnScopedSlot,
  } from '/@/components/UI/Table'
  import { defineComponent } from 'vue'
  import { isFunction } from 'easy-fns-ts'
  import { useTableContext } from '/@/components/UI/Table/src/hooks/useTableContext'
  import { useI18n } from '/@/locales'

  export default defineComponent({
    name: 'WTableColumnIndex',

    inheritAttrs: false,

    setup() {
      const { t } = useI18n()
      const { tableProps } = useTableContext()

      // render index
      const renderIndex = (i: number) => {
        return isFunction(tableProps.value.index)
          ? tableProps.value.index!(i)
          : (tableProps.value.pageNum! - 1) * tableProps.value.pageSize! + i + 1
      }

      // render default index slot
      const renderDefaultSlot = () => ({
        default: ({ $index }: ElTableColumnScopedSlot) => (
          <span>{renderIndex(+$index)}</span>
        ),
      })

      return () => {
        const defaultProps: Partial<ElTableColumnProps> = {
          key: 'index',
          type: 'index',
          width: '80',
          align: 'center',
          fixed: 'left',
          label: t('component.table.index'),
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
