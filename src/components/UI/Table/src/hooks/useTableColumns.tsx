import type { WTable } from '../types'

// Extend Naive UI columns
export const useTableColumns = (props: ComputedRef<WTable.Props>) => {
  const columns = ref<WTable.Column[]>([])
  const { t } = useAppI18n()

  watchEffect(() => {
    columns.value = props.value.columns?.map((item) => {
      if (item.extendType === 'formatter') {
        return {
          ...item,

          render(p) {
            return item.formatter!(p)
          },
        }
      }

      if (item.extendType === 'action') {
        const isShow = (t: WTable.ColumnActionType) =>
          (item.extendActionType ?? ['create', 'delete', 'read']).includes(t)

        return {
          ...item,

          width: 350,

          render(p) {
            return (
              <n-space size="small">
                {isShow('create') && (
                  <w-button
                    icon="ant-design:plus-outlined"
                    onClick={() => item.onCreate!(p)}
                  >
                    {t('component.table.buttons.create')}
                  </w-button>
                )}

                {isShow('read') && (
                  <w-button
                    icon="ant-design:edit-outlined"
                    onClick={() => item.onRead!(p)}
                  >
                    {t('component.table.buttons.edit')}
                  </w-button>
                )}

                {isShow('delete') && (
                  <n-popconfirm
                    placement="left"
                    onPositiveClick={() => item.onDelete!(p)}
                  >
                    {{
                      default: () => 'Are you sure to continue?',
                      trigger: () => (
                        <w-button icon="ant-design:delete-outlined">
                          {t('component.table.buttons.delete')}
                        </w-button>
                      ),
                    }}
                  </n-popconfirm>
                )}
              </n-space>
            )
          },
        }
      }

      if (item.extendType === 'icon') {
        return {
          ...item,

          width: 80,

          render(p) {
            return (
              <w-icon
                width="24"
                class="-mb-2"
                icon={
                  typeof item.extendIconName === 'string'
                    ? item.extendIconName
                    : item.extendIconName(p)
                }
              ></w-icon>
            )
          },
        }
      }

      return item
    })
  })

  return {
    columns,
  }
}
