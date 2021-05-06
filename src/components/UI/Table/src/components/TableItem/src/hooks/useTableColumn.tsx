import type { SetupContext } from 'vue'
import type {
  WTableHeaderItem,
  ElTableColumnScopedSlot,
} from '/@/components/UI/Table'

import { computed, renderSlot, renderList, resolveDynamicComponent } from 'vue'
import { easyOmit, isUndefined } from 'easy-fns-ts'

export const useTableColumn = (
  props: SetupProp<WTableHeaderItem>,
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
            default: (scope: ElTableColumnScopedSlot) => {
              return renderSlot(slots, props.item!.type!, scope)
            },
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
  const renderNestedColumns = () => {
    // render nested column slot
    const renderNestedColumnSlot = () => {
      const ret = {}
      Object.keys(slots).map((name) => {
        ret[name] = (scope: ElTableColumnScopedSlot) =>
          renderSlot(slots, name, scope)
      })
      return ret
    }

    return (
      props.item?.visible !== false && (
        <el-table-column {...getColumnBindValue.value}>
          {renderList(props.item?.children, (value) => (
            <w-table-item item={value}>{renderNestedColumnSlot()}</w-table-item>
          ))}
        </el-table-column>
      )
    )
  }

  return {
    renderNotNestedColumns,
    renderNestedColumns,
  }
}
