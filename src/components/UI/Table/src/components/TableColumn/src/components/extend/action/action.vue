<script lang="tsx">
  import type { PropType } from 'vue'
  import type { WTable } from '/@/components/UI/Table'

  import { defineComponent, renderSlot, renderList } from 'vue'
  import { isArray } from 'easy-fns-ts'

  import { useActionColumnDefaultButtonGroup } from './hooks/useActionColumnDefaultButtonGroup'

  export default defineComponent({
    name: 'WTableColumnAction',

    inheritAttrs: false,

    props: {
      column: Object as PropType<WTable.Header.Item.Action>,
    },

    setup(props, ctx) {
      const { slots } = ctx

      const { filteredButtonGroup } = useActionColumnDefaultButtonGroup(props)

      // render action by button group array
      const renderActionArray = (scope: WTable.ScopeSlotData) => {
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
          renderList(
            props.column?.componentProps?.actionButtonGroup!,
            (value) => (
              <w-button
                {...{ ...value, onClick: () => value.onClick!(scope) }}
              ></w-button>
            )
          )

        const isArrayRender =
          props.column?.componentProps?.actionType === 'array' &&
          isArray(props.column?.componentProps?.actionButtonGroup!) &&
          props.column?.componentProps?.actionButtonGroup!.length > 0

        return isArrayRender ? renderCustom() : renderDefault()
      }

      // render action default slot
      // `slot` or `array`
      const renderDefaultSlot = () => ({
        default: (scope: WTable.ScopeSlotData) =>
          props.column?.componentProps?.actionType === 'slot'
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
