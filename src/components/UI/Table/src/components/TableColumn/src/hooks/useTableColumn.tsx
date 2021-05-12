import type { SetupContext } from 'vue'
import type {
  WTableHeaderItem,
  ElTableColumnScopedSlot,
} from '/@/components/UI/Table'

import { computed, renderSlot, renderList, resolveDynamicComponent } from 'vue'
import { easyOmit, isUndefined } from 'easy-fns-ts'

import { renderSlots } from '/@/utils/shared'

export const useTableColumn = (
  props: SetupProp<WTableHeaderItem, AnyObject>,
  ctx: SetupContext
) => {
  const { slots } = ctx

  // omit `children` field
  const getColumnBindValue = computed(() => easyOmit(props.item, 'children'))

  /**
   * @description render not nested columns
   */
  const renderNotNestedColumns = () => {
    // render common column slot
    // the slots defined by user through prop named slot
    const renderCommonColumnSlot = () =>
      !isUndefined(slots[props.item!.prop!])
        ? {
            default: (scope: ElTableColumnScopedSlot) =>
              renderSlot(slots, props.item!.prop!, scope),
          }
        : {}

    // render typed column slot
    // only `expand` and `action` typed column has slot
    const renderTypeColumnSlot = () => {
      const slotableColumn = ['expand', 'action']

      return slotableColumn.includes(props.item!.type!)
        ? {
            default: (scope: ElTableColumnScopedSlot) =>
              renderSlot(slots, props.item!.type!, scope),
          }
        : {}
    }

    // render common columns
    const renderCommonColumn = () => (
      <el-table-column {...getColumnBindValue.value}>
        {renderCommonColumnSlot()}
      </el-table-column>
    )

    // render typed columns
    // include `index`/`select`/`expand`/`action`/`switch` types
    // resolve dynamically through `resolveDynamicComponent`
    const renderTypeColumn = () => {
      // handle editable column
      // this is used for editable cell, prevent only load for once and all cell in this column will display the same content
      // need to use the `editable` component in slot
      if (props.item?.type === 'editable') {
        return (
          <el-table-column {...getColumnBindValue.value}>
            {{
              default: ({ row }: ElTableColumnScopedSlot) => (
                <w-table-column-editable
                  item={props.item}
                  row={row}
                ></w-table-column-editable>
              ),
            }}
          </el-table-column>
        )
      }

      const customComponent = resolveDynamicComponent(
        `w-table-column-${props.item!.type}`
      )

      return (
        <customComponent column={props.item}>
          {renderTypeColumnSlot()}
        </customComponent>
      )
    }

    // finally return specific column
    return !isUndefined(props.item!.type)
      ? renderTypeColumn()
      : renderCommonColumn()
  }

  /**
   * @description render nested columns
   */
  const renderNestedColumns = () => (
    <el-table-column {...getColumnBindValue.value}>
      {renderList(props.item?.children, (value) => (
        <w-table-item item={value}>{renderSlots(slots)}</w-table-item>
      ))}
    </el-table-column>
  )

  return {
    renderNotNestedColumns,
    renderNestedColumns,
  }
}
