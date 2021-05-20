import type { SetupContext } from 'vue'
import type { WTable } from '/@/components/UI/Table'

import { computed, renderSlot, renderList, resolveDynamicComponent } from 'vue'
import { isUndefined, easyDeepGet } from 'easy-fns-ts'

import { renderSlots } from '/@/utils/shared'
import WIcon from '/@/components/UI/Icon'
import { useClipboard } from '@vueuse/core'
import { useMessage } from '/@/hooks/component/useMessage'

export const useTableColumn = (
  props: SetupProp<{ item: WTable.Header.Item.Props }>,
  ctx: SetupContext
) => {
  const { slots } = ctx

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
    if ((props.item as WTable.Header.Item.Default).componentProps?.copy) {
      const onCopy = (val: string) => {
        const { copy } = useClipboard({ source: val })
        copy()
        useMessage({ type: 'success', message: 'Copy Success' })
      }

      return (
        <el-table-column {...getColumnBindValue.value}>
          {{
            default: (scope: WTable.ElTable.SlotData) => {
              // fit for nested prop
              // use `deepGet` method to get real nested value
              const getValue = easyDeepGet(scope.row, getProp.value)

              return (
                <div class="flex flex-nowrap flex-row justify-start">
                  <div class="truncate w-11/12">{getValue}</div>

                  <WIcon
                    icon="ant-design:copy-outlined"
                    class="cursor-pointer text-blue-700 mt-1"
                    height="16"
                    onClick={() => onCopy(getValue)}
                  ></WIcon>
                </div>
              )
            },
          }}
        </el-table-column>
      )
    }

    return <el-table-column {...getColumnBindValue.value}></el-table-column>
  }

  /**
   * @description Render typed columns
   * include `index`/`select`/`expand`/`action`/`switch` etc.
   * resolve dynamically through `resolveDynamicComponent`
   */
  const renderTypeColumn = () => {
    // Slot type
    if (getType.value === 'slot') {
      return (
        <el-table-column {...getColumnBindValue.value}>
          {{
            default: (scope: WTable.ElTable.SlotData) =>
              renderSlot(slots, getProp.value!, scope),
          }}
        </el-table-column>
      )
    }

    // Render type
    if (getType.value === 'render') {
      return (
        <el-table-column {...getColumnBindValue.value}>
          {{
            default: (scope: WTable.ElTable.SlotData) =>
              (props.item as WTable.Header.Item.Render)?.componentProps
                ?.render!(scope),
          }}
        </el-table-column>
      )
    }

    // Editable type
    // this is used for editable cell, prevent only load for once in all cells in this column, otherwise this column will display the same content
    // need to use the `editable` component in slot
    if (getType.value === 'editable') {
      const editableColumn = resolveDynamicComponent(
        `w-table-column-extend-editable`
      )

      return (
        <el-table-column {...getColumnBindValue.value}>
          {{
            default: ({ row }: WTable.ElTable.SlotData) => (
              <editableColumn item={props.item} row={row}></editableColumn>
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
            default: (scope: WTable.ElTable.SlotData) =>
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
  const renderNotNestedColumns = () =>
    // only type='default' or type is undefined
    // render common columns
    isUndefined(getType.value) || getType.value === 'default'
      ? renderCommonColumn()
      : renderTypeColumn()

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
