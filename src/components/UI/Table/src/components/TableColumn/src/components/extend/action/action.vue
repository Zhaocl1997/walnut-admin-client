<script lang="tsx">
  import type {
    ElTableColumnScopedSlot,
    WTableEditableColumnDefaultAction,
  } from '/@/components/UI/Table'
  import type { PropType } from 'vue'

  import { defineComponent, renderSlot, renderList, computed } from 'vue'
  import { isArray } from 'easy-fns-ts'

  import { useActionColumnDefaultButtonGroup } from './hooks/useActionColumnDefaultButtonGroup'

  export default defineComponent({
    name: 'WTableColumnAction',

    inheritAttrs: false,

    props: {
      column: Object as PropType<WTableEditableColumnDefaultAction>,
    },

    setup(props, ctx) {
      const { slots } = ctx

      const { filteredButtonGroup } = useActionColumnDefaultButtonGroup(props)

      // render action by button group array
      const renderActionArray = (scope: ElTableColumnScopedSlot) => {
        // render default button group
        const renderDefault = () => {
          return renderList(filteredButtonGroup.value, (value) => (
            <w-button
              {...{ ...value, onClick: () => value.onClick!(scope) }}
            ></w-button>
          ))
        }

        // render custom button group
        const renderCustom = () =>
          renderList(props.column!.actionButtonGroup, (value) => (
            <w-button
              {...{ ...value, onClick: () => value.onClick!(scope) }}
            ></w-button>
          ))

        const isArrayRender =
          props.column?.actionType === 'array' &&
          isArray(props.column.actionButtonGroup) &&
          props.column.actionButtonGroup.length > 0

        return isArrayRender ? renderCustom() : renderDefault()
      }

      // render action default slot
      // `slot` or `array`
      const renderDefaultSlot = () => ({
        default: (scope: ElTableColumnScopedSlot) =>
          props.column?.actionType === 'slot'
            ? renderSlot(slots, 'default', scope)
            : renderActionArray(scope),
      })

      return () => (
        <el-table-column {...props.column}>
          {renderDefaultSlot()}
        </el-table-column>
      )
    },
  })
</script>
