<script lang="tsx">
  import type { PropType } from 'vue'
  import type {
    WTableHeaderItem,
    ActionColumn,
    IndexColumn,
    ExpandColumn,
    SelectColumn,
    SwitchColumn,
    ElTableColumnScopedSlot,
  } from '/@/components/UI/Table'

  import { defineComponent, computed, renderSlot, renderList } from 'vue'
  import { easyOmit, isArray, isUndefined } from 'easy-fns-ts'

  import { useTableColumnComponents } from './hooks/useTableColumnComponents'

  export default defineComponent({
    name: 'WTableItem',

    inheritAttrs: false,

    props: {
      item: Object as PropType<WTableHeaderItem>,
    },

    setup(props, ctx) {
      const { slots } = ctx

      useTableColumnComponents()

      const getColumnBindValue = computed(() =>
        easyOmit(props.item, 'children')
      )

      // render base column slot
      const renderBaseColumnSlot = () => {
        if (isUndefined(slots[props.item!.prop!])) {
          return {}
        }

        return {
          default: (scope: ElTableColumnScopedSlot) =>
            renderSlot(slots, props.item!.prop!, scope),
        }
      }

      // render base columns
      // TODO
      const renderBaseColumns = () => {
        if ((props.item as IndexColumn).type === 'index') {
          return (
            <w-table-column-index column={props.item}></w-table-column-index>
          )
        }

        if ((props.item as ExpandColumn).type === 'expand') {
          return (
            <w-table-column-expand column={props.item}>
              {{
                default: (scope: ElTableColumnScopedSlot) => {
                  return renderSlot(slots, 'expand', scope)
                },
              }}
            </w-table-column-expand>
          )
        }

        if ((props.item as SelectColumn).type === 'selection') {
          return (
            <w-table-column-selection
              column={props.item}
            ></w-table-column-selection>
          )
        }

        if ((props.item as ActionColumn).type === 'action') {
          return (
            <w-table-column-action column={props.item}>
              {{
                default: (scope: ElTableColumnScopedSlot) => {
                  return renderSlot(slots, 'action', scope)
                },
              }}
            </w-table-column-action>
          )
        }

        if ((props.item as SwitchColumn).type === 'switch') {
          return (
            <w-table-column-switch column={props.item}></w-table-column-switch>
          )
        }

        return (
          <el-table-column {...getColumnBindValue.value}>
            {renderBaseColumnSlot()}
          </el-table-column>
        )
      }

      // render nested cloumn slot
      const renderNestedColumnSlot = () => {
        const ret = {}
        Object.keys(slots).map((name) => {
          ret[name] = (scope: ElTableColumnScopedSlot) =>
            renderSlot(slots, name, scope)
        })
        return ret
      }

      // render nested columns
      const renderNestedColumns = () =>
        props.item?.visible !== false && (
          <el-table-column {...getColumnBindValue.value}>
            {renderList(props.item?.children, (value) => (
              <w-table-item item={value}>
                {renderNestedColumnSlot()}
              </w-table-item>
            ))}
          </el-table-column>
        )

      // render columns
      const renderColumns = () =>
        isArray(props.item!.children)
          ? renderNestedColumns()
          : props.item?.visible !== false && renderBaseColumns()

      return () => renderColumns()
    },
  })
</script>
