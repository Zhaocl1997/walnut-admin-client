import type { WTable } from '../types'
import type { InternalRowData } from 'naive-ui/lib/data-table/src/interface'

export const useTableColumns = (props: ComputedRef<WTable.Props>) => {
  const columns = ref<WTable.Column[]>([])
  const { t } = useAppI18n()

  watchEffect(() => {
    columns.value = props.value.columns?.map((item) => {
      if ((item as WTable.ExtendType.Formatter).extendType === 'formatter') {
        return {
          ...item,

          render(rowData: InternalRowData, rowIndex: number) {
            return (item as WTable.ExtendType.Formatter).formatter!(
              rowData,
              rowIndex
            )
          },
        }
      }

      if ((item as WTable.ExtendType.Action).extendType === 'action') {
        return {
          ...item,

          width: 350,

          render(rowData: InternalRowData, rowIndex: number) {
            return (
              <n-space size="small">
                <w-button
                  icon="ant-design:plus-outlined"
                  onClick={() =>
                    (item as WTable.ExtendType.Action).onCreate!(
                      rowData,
                      rowIndex
                    )
                  }
                >
                  {t('component.table.buttons.create')}
                </w-button>

                <w-button
                  icon="ant-design:edit-outlined"
                  onClick={() =>
                    (item as WTable.ExtendType.Action).onRead!(
                      rowData,
                      rowIndex
                    )
                  }
                >
                  {t('component.table.buttons.edit')}
                </w-button>

                <n-popconfirm
                  placement="left"
                  onPositiveClick={() =>
                    (item as WTable.ExtendType.Action).onDelete!(
                      rowData,
                      rowIndex
                    )
                  }
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
              </n-space>
            )
          },
        }
      }

      if ((item as WTable.ExtendType.Icon).extendType === 'icon') {
        return {
          ...item,

          width: 80,

          render(rowData: InternalRowData, rowIndex: number) {
            return (
              <w-icon
                width="24"
                class="-mb-2"
                icon={
                  typeof (item as WTable.ExtendType.Icon).extendIconName ===
                  'string'
                    ? (item as WTable.ExtendType.Icon).extendIconName
                    : ((item as WTable.ExtendType.Icon).extendIconName as Fn)(
                        rowData,
                        rowIndex
                      )
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
