<script lang="tsx">
  import type {
    ElTableColumnScopedSlot,
    WTableEditableColumnDefaultAction,
    WTableActionConfig,
  } from '/@/components/UI/Table'
  import type { PropType } from 'vue'
  import type { WButtonGroup } from '/@/components/UI/ButtonGroup'

  import { defineComponent, renderSlot, renderList } from 'vue'
  import { isArray } from 'easy-fns-ts'

  import { useI18n } from '/@/locales'
  import { useTableContext } from '/@/components/UI/Table/src/hooks/useTableContext'

  export default defineComponent({
    name: 'WTableColumnAction',

    inheritAttrs: false,

    props: {
      column: Object as PropType<WTableEditableColumnDefaultAction>,
    },

    setup(props, ctx) {
      const { slots } = ctx
      const { t } = useI18n()
      const { emitEvents } = useTableContext()

      const defaultActionButtonGroup: WButtonGroup = [
        {
          type: 'text',
          size: 'small',
          text: 'Create',
          onClick: (scope) => {
            emitEvents.action('create', scope)
          },
        },
        {
          type: 'text',
          size: 'small',
          text: 'Edit',
          onClick: (scope) => {
            emitEvents.action('edit', scope)
          },
        },
        {
          type: 'text',
          size: 'small',
          text: 'Delete',
          onClick: (scope) => {
            emitEvents.action('delete', scope)
          },
        },
      ]

      // render action by button group array
      const renderActionArray = (scope: ElTableColumnScopedSlot) => {
        // render default button group
        const renderDefault = () => {
          // filter the configed button group
          const filteredButtonGroup = defaultActionButtonGroup.filter((item) =>
            props.column?.actionConfig.includes(
              (item.text as string).toLowerCase() as WTableActionConfig
            )
          )
          return renderList(filteredButtonGroup, (value) => (
            <w-button
              {...{ ...value, onClick: () => value.onClick!(scope) }}
            ></w-button>
          ))
        }

        // render custom button group
        const renderCustom = () =>
          renderList(props.column!.buttonGroup, (value) => (
            <w-button
              {...{ ...value, onClick: () => value.onClick!(scope) }}
            ></w-button>
          ))

        const isArrayRender =
          props.column?.actionType === 'array' &&
          isArray(props.column.buttonGroup) &&
          props.column.buttonGroup.length > 0

        return isArrayRender ? renderCustom() : renderDefault()
      }

      // render action slot
      const renderDefaultSlot = () => {
        return {
          default: (scope: ElTableColumnScopedSlot) =>
            props.column?.actionType === 'slot'
              ? renderSlot(slots, 'default', scope)
              : renderActionArray(scope),
        }
      }

      return () => (
        <el-table-column
          {...{
            label: t('component.table.operation'),
            ...props.column,
          }}
        >
          {renderDefaultSlot()}
        </el-table-column>
      )
    },
  })
</script>
