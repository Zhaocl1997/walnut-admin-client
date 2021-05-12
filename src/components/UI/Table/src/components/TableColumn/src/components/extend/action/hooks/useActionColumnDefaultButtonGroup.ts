import type {
  WTableEditableColumnActionButtonGroup,
  WTableEditableColumnDefaultAction,
} from '/@/components/UI/Table'

import { computed } from 'vue'

import { useI18n } from '/@/locales'

import { useTableContext } from '/@/components/UI/Table/src/hooks/useTableContext'

export const useActionColumnDefaultButtonGroup = (
  props: SetupProp<
    {},
    { column?: WTableEditableColumnDefaultAction | undefined }
  >
) => {
  const { t } = useI18n()

  const { emitEvents, tableProps } = useTableContext()

  // default button group
  const defaultButtonGroup = computed(
    (): WTableEditableColumnActionButtonGroup => {
      return [
        {
          type: 'text',
          size: 'small',
          text: t('component.table.buttons.create'),
          actionButtonType: 'create',
          onClick: (scope) => {
            // for emit event
            emitEvents.action('create', scope)

            // for prop usage
            tableProps.value.onAction!('create', scope)
          },
        },
        {
          type: 'text',
          size: 'small',
          text: t('component.table.buttons.edit'),
          actionButtonType: 'edit',
          onClick: (scope) => {
            emitEvents.action('edit', scope)
            tableProps.value.onAction!('edit', scope)
          },
        },
        {
          type: 'text',
          size: 'small',
          text: t('component.table.buttons.delete'),
          actionButtonType: 'delete',
          onClick: (scope) => {
            emitEvents.action('delete', scope)
            tableProps.value.onAction!('delete', scope)
          },
        },
      ]
    }
  )

  // filter the configed button group
  const filteredButtonGroup = computed(() =>
    defaultButtonGroup.value.filter((item) =>
      (props.column?.actionConfig ?? ['create', 'delete', 'edit']).includes(
        item.actionButtonType!
      )
    )
  )

  return { filteredButtonGroup }
}
