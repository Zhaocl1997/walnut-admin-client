<script lang="tsx">
  import { defineComponent, renderSlot } from 'vue'
  import { useTableContext } from '../../hooks/useTableContext'
  import { WButtonProps } from '/@/components/UI/Button'
  import { useI18n } from '/@/locales'

  export default defineComponent({
    name: 'WTableColumnAction',

    inheritAttrs: false,

    setup(_, ctx) {
      const { slots } = ctx
      const { t } = useI18n()
      const { tableProps } = useTableContext()

      const defaultActionButtonGroup: Array<
        WButtonProps & { onClick: (e: Event) => void }
      > = [
        {
          type: 'text',
          size: 'small',
          text: 'Create',
          onClick: () => {
            console.log(1)
          },
        },
        {
          type: 'text',
          size: 'small',
          text: 'Edit',
          onClick: () => {
            console.log(2)
          },
        },
        {
          type: 'text',
          size: 'small',
          text: 'Delete',
          onClick: () => {
            console.log(3)
          },
        },
      ]

      // render action slot
      const renderDefaultSlot = () => ({
        default: (scope: Recordable) =>
          defaultActionButtonGroup.length !== 0
            ? defaultActionButtonGroup.map((i) => <w-button {...i}></w-button>)
            : renderSlot(slots, 'default', scope),
      })

      return () => {
        const defaultProps = {
          key: 'action',
          minWidth: '180px',
          align: 'center',
          fixed: 'right',
          label: t('component.table.operation'),
        }

        return (
          tableProps.value.hasAction && (
            <el-table-column {...defaultProps}>
              {renderDefaultSlot()}
            </el-table-column>
          )
        )
      }
    },
  })
</script>
