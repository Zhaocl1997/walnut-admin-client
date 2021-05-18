import type { SetupContext } from 'vue'
import type { WTable } from '/@/components/UI/Table'

import { computed, renderSlot, renderList, resolveDynamicComponent } from 'vue'
import { isUndefined } from 'easy-fns-ts'

import { renderSlots } from '/@/utils/shared'

export const useTableColumn = (
  props: SetupProp<{ item: WTable.Header.Item.Props }>,
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

  /**
   * @description Render common columns
   */
  const renderCommonColumn = () => {
    // render common column slot
    // the slots defined by user through prop named slot
    const renderCommonColumnSlot = () =>
      !isUndefined(slots[getProp.value!])
        ? {
            default: (scope: WTable.ScopeSlotData) =>
              renderSlot(slots, getProp.value!, scope),
          }
        : {}

    return (
      <el-table-column {...getColumnBindValue.value}>
        {renderCommonColumnSlot()}
      </el-table-column>
    )
  }

  /**
   * @description Render typed columns
   * include `index`/`select`/`expand`/`action`/`switch` types
   * resolve dynamically through `resolveDynamicComponent`
   */
  const renderTypeColumn = () => {
    // render typed column slot
    // only `expand` and `action` typed column has slot
    const renderTypeColumnSlot = () => {
      const slotableColumn = ['expand', 'action']

      return slotableColumn.includes(getType.value!)
        ? {
            default: (scope: WTable.ScopeSlotData) =>
              renderSlot(slots, getType.value!, scope),
          }
        : {}
    }

    // el-table-column original typed columns
    const originalColumnTypes = ['index', 'expand', 'selection']
    if (originalColumnTypes.includes(getType.value!)) {
      const editableColumn = resolveDynamicComponent(
        `w-table-column-default-${getType.value}`
      )

      return (
        <editableColumn column={props.item?.columnProps}>
          {renderTypeColumnSlot()}
        </editableColumn>
      )
    }

    // handle editable column
    // this is used for editable cell, prevent only load for once and all cell in this column will display the same content
    // need to use the `editable` component in slot
    if (getType.value === 'editable') {
      const editableColumn = resolveDynamicComponent(
        `w-table-column-extend-editable`
      )

      return (
        <el-table-column {...getColumnBindValue.value}>
          {{
            default: ({ row }: WTable.ScopeSlotData) => (
              <editableColumn item={props.item} row={row}></editableColumn>
            ),
          }}
        </el-table-column>
      )
    }

    const extendComponent = resolveDynamicComponent(
      `w-table-column-extend-${getType.value}`
    )

    return (
      <extendComponent column={props.item}>
        {renderTypeColumnSlot()}
      </extendComponent>
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
      {renderList(
        (props.item as WTable.Header.Item.Default)?.children,
        (value) => (
          <w-table-item item={value}>{renderSlots(slots)}</w-table-item>
        )
      )}
    </el-table-column>
  )

  return {
    renderNotNestedColumns,
    renderNestedColumns,
  }
}
