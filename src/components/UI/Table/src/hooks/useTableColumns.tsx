import type { WTable } from '../types'
import type { TableBaseColumn } from 'naive-ui/lib/data-table/src/interface'

import { defaultAppLocaleMessageKeys } from '../../../shared'
import { useDict, dictDataMap } from '/@/hooks/core/useDict'

// Extend Naive UI columns
export const useTableColumns = (props: ComputedRef<WTable.Props>) => {
  const columns = ref<WTable.Column[]>([])
  const { t } = useAppI18n()

  const translateItem = (item: WTable.Column) => {
    if (props.value.localeUniqueKey) {
      if (item.type !== 'expand' && item.type !== 'selection') {
        if (defaultAppLocaleMessageKeys.includes(item.key as string)) {
          return {
            ...item,
            title: () => t(`app:base:${item.key}`),
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

  watchEffect(async () => {
    await Promise.all(
      props.value.columns?.map(
        async (i) => i.extendType === 'dict' && (await useDict(i.dictType))
      )!
    )

    // @ts-ignore
    columns.value = props.value.columns?.map((item) => {
      const tItem = props.value.localeUniqueKey ? translateItem(item) : item

      // formatter
      if (tItem.extendType === 'formatter') {
        return {
          ...tItem,

          render(p) {
            return tItem.formatter!(p)
          },
        }
      }

      // link
      if (tItem.extendType === 'link') {
        return {
          ...tItem,

          render(p) {
            return (
              <n-a onClick={() => tItem.onClick(p)}>
                {p[(tItem as TableBaseColumn).key]}
              </n-a>
            )
          },
        }
      }

      // dict
      if (tItem.extendType === 'dict') {
        return {
          ...tItem,

          render(p) {
            const dictData = dictDataMap.get(tItem.dictType)

            const target = dictData?.find(
              (i) =>
                i.value ===
                (p[(tItem as TableBaseColumn).key] as boolean).toString()
            )

            if (tItem.tagProps) {
              return <n-tag {...tItem.tagProps(p)}>{t(target?.label!)}</n-tag>
            }

            return <span>{t(target?.label!)}</span>
          },
        }
      }

      // action
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
                  <w-button
                    confirm
                    icon="ant-design:delete-outlined"
                    onClick={() => tItem.onDelete!(p)}
                  >
                    {t('app:button:delete')}
                  </w-button>
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

    // auto handle scrollX
    const widths = props.value.columns
      ?.map((i) => {
        if (i.type !== 'expand' && i.type !== 'selection') {
          return i.width
        } else {
          return 80
        }
      })
      .filter((i) => i)

    if (
      widths?.length !== 0 &&
      widths?.length === props.value.columns?.length
    ) {
      const w = widths?.reduce((p, c) => (p as number)! + (c as number)!, 0)
      // @ts-ignore
      props.value.scrollX = w
    }
  })

  return { columns }
}
