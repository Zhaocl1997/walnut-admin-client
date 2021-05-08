import type {
  WTableEditableColumnActionButtonGroup,
  WTableEditableColumnDefaultAction,
} from '/@/components/UI/Table'

import { computed } from 'vue'

import { useTableContext } from '/@/components/UI/Table/src/hooks/useTableContext'

export const useActionColumnDefaultButtonGroup = (
  props: SetupProp<
    {},
    { column?: WTableEditableColumnDefaultAction | undefined }
  >,
  t: Fn
) => {
  const { emitEvents } = useTableContext()

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
            emitEvents.action('create', scope)
          },
        },
        {
          type: 'text',
          size: 'small',
          text: t('component.table.buttons.edit'),
          actionButtonType: 'edit',
          onClick: (scope) => {
            emitEvents.action('edit', scope)
          },
        },
        {
          type: 'text',
          size: 'small',
          text: t('component.table.buttons.delete'),
          actionButtonType: 'delete',
          onClick: (scope) => {
            emitEvents.action('delete', scope)
          },
        },
      ]
    }
  )

  // filter the configed button group
  const filteredButtonGroup = computed(() =>
    defaultButtonGroup.value.filter((item) =>
      props.column?.actionConfig.includes(item.actionButtonType!)
    )
  )

  return { filteredButtonGroup }
}
