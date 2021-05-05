<script lang="tsx">
  import type { PropType } from 'vue'
  import type {
    WTableHeaderItem,
    ActionColumn,
    ElTableColumnScopedSlot,
  } from '/@/components/UI/Table'

  import { defineComponent, computed, renderSlot } from 'vue'
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
        easyOmit(
          {
            ...props.item,
            align: props.item!.align ? props.item!.align : 'center',
            showOverflowTooltip:
              props.item!.showOverflowTooltip !== undefined
                ? props.item!.showOverflowTooltip
                : true,
          },
          'children'
        )
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
      const renderBaseColumns = () => {
        if (props.item!.type === 'index') {
          return <w-table-column-index></w-table-column-index>
        }

        if (props.item!.type === 'expand') {
          return <w-table-column-expand></w-table-column-expand>
        }

        if (props.item!.type === 'selection') {
          return <w-table-column-select></w-table-column-select>
        }

        if ((props.item as ActionColumn).extType === 'action') {
          return <w-table-column-action></w-table-column-action>
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
            {props.item?.children?.map((item) => (
              <w-table-item item={item}>
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
