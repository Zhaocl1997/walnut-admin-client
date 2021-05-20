import type { WTable } from '/@/components/UI/Table'

import { computed } from 'vue'
import { useI18n } from '/@/locales'
import { useTableContext } from '/@/components/UI/Table/src/hooks/useTableContext'

export const useActionColumnDefaultButtonGroup = (
  props: SetupProp<{ column: WTable.Header.Item.Action }>
) => {
  const { t } = useI18n()

  const { tableEvent } = useTableContext()

  const onAction = (
    type: WTable.Header.Extend.Action.Config,
    scope: WTable.ElTable.SlotData
  ) => {
    tableEvent({
      eventName: 'action',
      eventParams: {
        type: type,
        scope: {
          row: scope.row,
          column: scope.column,
          $index: scope.$index,
        },
      },
    })
  }

  // default button group
  const defaultButtonGroup = computed(
    (): WTable.Header.Extend.Action.Group[] => {
      return [
        {
          type: 'text',
          size: 'small',
          text: t('component.table.buttons.create'),
          actionButtonType: 'create',
          onClick: (scope) => {
            onAction('create', scope)
          },
        },
        {
          type: 'text',
          size: 'small',
          text: t('component.table.buttons.edit'),
          actionButtonType: 'edit',
          onClick: (scope) => {
            onAction('edit', scope)
          },
        },
        {
          type: 'text',
          size: 'small',
          text: t('component.table.buttons.delete'),
          actionButtonType: 'delete',
          onClick: (scope) => {
            onAction('delete', scope)
          },
        },
      ]
    }
  )

  // filter the configed button group
  const filteredButtonGroup = computed(() =>
    defaultButtonGroup.value.filter((item) =>
      (
        props.column?.componentProps?.actionConfig ?? [
          'create',
          'delete',
          'edit',
        ]
      ).includes(item.actionButtonType!)
    )
  )

  return { filteredButtonGroup }
}
