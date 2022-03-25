import type { WTable } from '../types'
import type { TableBaseColumn } from 'naive-ui/lib/data-table/src/interface'

import { defaultAppLocaleMessageKeys } from '../../../shared'

// Extend Naive UI columns
export const useTableColumns = (
  props: ComputedRef<WTable.Props>,
  ApiTableListParams: Ref<BaseListParams>,
  setProps: WTable.SetProps
) => {
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
    // cached for dict column
    await Promise.all(
      props.value.columns?.map(
        async (i) => i.extendType === 'dict' && (await useDict(i.dictType))
      )!
    )

    // @ts-ignore
    columns.value = props.value.columns
      ?.map((i) => ({ ...i, show: i.show ?? true }))
      .filter((i) => i.show)
      .map((item) => {
        // default value override
        item.align = item.align ?? 'center'

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

        // index based on ApiTableListParams
        if (tItem.extendType === 'index') {
          return {
            ...tItem,

            width: 80,

            render(_, index) {
              return (
                (ApiTableListParams.value.page?.page! - 1) *
                  ApiTableListParams.value.page?.pageSize! +
                index +
                1
              )
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

            filterOptions: computed(() =>
              (tItem as TableBaseColumn).filter
                ? AppDictMap.get(tItem.dictType)?.map((i) => ({
                    value: i.value,
                    label: t(i.label!),
                  }))
                : []
            ),

            filterOptionValue:
              ApiTableListParams.value.query[(tItem as TableBaseColumn).key] ??
              null,

            render(p) {
              const dictData = AppDictMap.get(tItem.dictType)

              const target = dictData?.find(
                (i) =>
                  i.value ===
                  (p[(tItem as TableBaseColumn).key] as boolean).toString()
              )

              if (tItem.tagProps) {
                return <n-tag {...tItem.tagProps(p)}>{t(target?.label!)}</n-tag>
              }

              return <n-tag type={target?.tagType}>{t(target?.label!)}</n-tag>
            },
          }
        }

        // action
        if (tItem.extendType === 'action') {
          const isShow = (t: WTable.ColumnActionType) =>
            (tItem.extendActionType ?? ['delete', 'read']).includes(t)

          return {
            ...tItem,

            render(rowData, rowIndex) {
              return (
                <div class="flex items-center justify-center children:mr-2 whitespace-nowrap">
                  {isShow('create') && (
                    <w-button
                      auth={props.value.auths?.create}
                      icon-button
                      icon="ant-design:plus-outlined"
                      text-prop={t('app:button:create')}
                      onClick={() =>
                        tItem.onExtendActionType!({
                          type: 'create',
                          rowData,
                          rowIndex,
                        })
                      }
                      type="success"
                    ></w-button>
                  )}

                  {isShow('read') && (
                    <w-button
                      auth={props.value.auths?.read}
                      icon-button
                      icon="ant-design:edit-outlined"
                      text-prop={t('app:button:read')}
                      onClick={() =>
                        tItem.onExtendActionType!({
                          type: 'read',
                          rowData,
                          rowIndex,
                        })
                      }
                      type="info"
                    ></w-button>
                  )}

                  {isShow('delete') && (
                    <w-button
                      auth={props.value.auths?.delete}
                      confirm
                      icon-button
                      icon="ant-design:delete-outlined"
                      text-prop={t('app:button:delete')}
                      onClick={() =>
                        tItem.onExtendActionType!({
                          type: 'delete',
                          rowData,
                          rowIndex,
                        })
                      }
                      type="error"
                    ></w-button>
                  )}
                </div>
              )
            },
          }
        }

        // icon
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

  const handleScrollX = () => {
    // first is naive column type
    // second is extent column type
    const whiteList = [
      ['expand', 'selection'],
      ['index', 'icon'],
    ]

    // get columns width in array
    const widths = props.value.columns
      ?.map((i) => {
        // expand/selection/index/icon default width is 80
        if (
          !whiteList[0].includes(i.type!) &&
          !whiteList[1].includes(i.extendType!)
        ) {
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
      const w = widths?.reduce((p, c) => (p as number) + (c as number), 0)

      setProps({ scrollX: w })
    } else {
      AppWarn(
        `Table with 'localeUniqueKey' ${props.value.localeUniqueKey} has a column without width ! This may cause 'scrollX' calculate error !`
      )
    }
  }

  onMounted(() => {
    // auto handle scrollX
    handleScrollX()
  })

  return { columns }
}
