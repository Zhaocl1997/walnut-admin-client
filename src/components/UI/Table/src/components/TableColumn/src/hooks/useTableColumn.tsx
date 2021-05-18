import type { SetupContext } from 'vue'
import type {
  WTableHeaderItem,
  WTableHeaderItemNew,
  ElTableColumnScopedSlot,
} from '/@/components/UI/Table'

import { computed, renderSlot, renderList, resolveDynamicComponent } from 'vue'
import { isUndefined } from 'easy-fns-ts'

import { renderSlots } from '/@/utils/shared'

export const useTableColumn = (
  props: SetupProp<WTableHeaderItemNew, AnyObject>,
  ctx: SetupContext
) => {
  const { slots } = ctx

  //
  const getColumnBindValue = computed(() => props.item?.columnProps)
  const getProp = computed(() => props.item?.columnProps?.prop)

  const getExtendType = computed(() => props.item?.type)
  const getBaseType = computed(() => props.item?.columnProps?.type)

  // `type` field in root level has higher priority then `type` in `columnProps`
  const getType = computed(() => getExtendType.value ?? getBaseType.value)

  // render common columns
  const renderCommonColumn = () => {
    // render common column slot
    // the slots defined by user through prop named slot
    const renderCommonColumnSlot = () =>
      !isUndefined(slots[getProp.value!])
        ? {
            default: (scope: ElTableColumnScopedSlot) =>
              renderSlot(slots, getProp.value!, scope),
          }
        : {}

    return (
      <el-table-column {...getColumnBindValue.value}>
        {renderCommonColumnSlot()}
      </el-table-column>
    )
  }

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

    // render typed column slot
    // only `expand` and `action` typed column has slot
    const renderTypeColumnSlot = () => {
      const slotableColumn = ['expand', 'action']

      return slotableColumn.includes(getType.value!)
        ? {
            default: (scope: ElTableColumnScopedSlot) =>
              renderSlot(slots, getType.value!, scope),
          }
        : {}
    }

    const customComponent = resolveDynamicComponent(
      `w-table-column-${getType.value}`
    )

    return (
      <customComponent column={props.item}>
        {renderTypeColumnSlot()}
      </customComponent>
    )
  }

  /**
   * @description render not nested columns
   */
  const renderNotNestedColumns = () => {
    // only type='default' or type is undefined
    // render common columns

    return isUndefined(getType.value)
      ? renderCommonColumn()
      : renderTypeColumn()
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
