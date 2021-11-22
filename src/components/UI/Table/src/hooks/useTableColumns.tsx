import type { WTable } from '../types'

// Extend Naive UI columns
export const useTableColumns = (props: ComputedRef<WTable.Props>) => {
  const columns = ref<WTable.Column[]>([])
  const { t } = useAppI18n()

  const translateItem = (item: WTable.Column) => {
    if (props.value.localeUniqueKey) {
      if (item.type !== 'expand' && item.type !== 'selection') {
        if (['createdAt', 'updatedAt', 'action'].includes(item.key as string)) {
          return {
            ...item,
            title: () => t(`table:base:${item.key}`),
          }
        }

        return {
          ...item,
          title: () => t(`table:${props.value.localeUniqueKey}:${item.key}`),
        }
      }
    }

    return item
  }

  watchEffect(() => {
    // @ts-ignore
    columns.value = props.value.columns?.map((item) => {
      const tItem = props.value.localeUniqueKey ? translateItem(item) : item

      if (tItem.extendType === 'formatter') {
        return {
          ...tItem,

          render(p) {
            return tItem.formatter!(p)
          },
        }
      }

      if (tItem.extendType === 'action') {
        const isShow = (t: WTable.ColumnActionType) =>
          (tItem.extendActionType ?? ['create', 'delete', 'read']).includes(t)

        return {
          ...tItem,

          render(p) {
            return (
              <div class="children:mr-2 whitespace-nowrap">
                {isShow('create') && (
                  <w-button
                    icon="ant-design:plus-outlined"
                    onClick={() => tItem.onCreate!(p)}
                  >
                    {t('app:button:create')}
                  </w-button>
                )}

                {isShow('read') && (
                  <w-button
                    icon="ant-design:edit-outlined"
                    onClick={() => tItem.onRead!(p)}
                  >
                    {t('app:button:read')}
                  </w-button>
                )}

                {isShow('delete') && (
                  <n-popconfirm
                    placement="left"
                    onPositiveClick={() => tItem.onDelete!(p)}
                  >
                    {{
                      default: () => 'Are you sure to continue?',
                      trigger: () => (
                        <w-button icon="ant-design:delete-outlined">
                          {t('app:button:delete')}
                        </w-button>
                      ),
                    }}
                  </n-popconfirm>
                )}
              </div>
            )
          },
        }
      }

      if (tItem.extendType === 'icon') {
        return {
          ...tItem,

          width: 80,

          render(p) {
            return (
              <w-icon
                width="24"
                class="-mb-2"
                icon={
                  typeof tItem.extendIconName === 'string'
                    ? tItem.extendIconName
                    : tItem.extendIconName(p)
                }
              ></w-icon>
            )
          },
        }
      }

      return tItem
    })
  })

  return { columns }
}
