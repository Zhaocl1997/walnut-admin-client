import { omit, sortBy } from 'lodash-es'
import type { WTable } from '../types'

import { getTableTranslated } from '../utils'

// Extend Naive UI columns
export const useTableColumns = (
  props: ComputedRef<WTable.Props>,
  ApiTableListParams: Ref<WalnutBaseListParams>,
  setProps: WTable.SetProps,
) => {
  const columns = ref<WTable.Column[]>([])
  const { t } = useAppI18n()

  const transformColumn = (item: WTable.Column) => {
    if (item.type === 'expand' || item.type === 'selection')
      return item

    return {
      ...item,
      title: () => (
        <>
          {getTableTranslated(props, item)}
          {item.titleHelpMessage && (
            <w-message
              msg={getTableTranslated(props, item, true)}
              class="inline"
            ></w-message>
          )}
        </>
      ),

      // this is used for column settings to display text correctly
      _titleText: () => getTableTranslated(props, item),
    }
  }

  watchEffect(async () => {
    // cached for dict column
    await Promise.all(
      props.value.columns?.map(
        async i => i.extendType === 'dict' && (await useDict(i.dictType)),
      )!,
    )

    // @ts-expect-error
    columns.value = props.value.columns
      ?.map(i => ({ ...i, _internalShow: i._internalShow ?? true }))
      .map((item) => {
        // default value override
        item.align = item.align ?? 'center'

        const tItem = props.value.localeUniqueKey ? transformColumn(item) : item

        // formatter
        if (tItem.extendType === 'formatter') {
          return {
            ...tItem,

            render(p) {
              return tItem.formatter(p)
            },
          }
        }

        // index based on ApiTableListParams
        if (tItem.extendType === 'index') {
          return {
            ...tItem,

            width: 70,

            render(_, index) {
              return (
                (ApiTableListParams.value.page?.page! - 1)
                  * ApiTableListParams.value.page?.pageSize!
                + index
                + 1
              )
            },
          }
        }

        // link
        if (tItem.extendType === 'link') {
          return {
            ...tItem,

            render(p) {
              return <n-a onClick={() => tItem.onClick(p)}>{p[tItem.key]}</n-a>
            },
          }
        }

        // tag
        if (tItem.extendType === 'tag') {
          return {
            ...tItem,

            render(p) {
              return (
                <n-tag {...tItem.tagProps!(p)}>{tItem.formatter(p)}</n-tag>
              )
            },
          }
        }

        // dict
        if (tItem.extendType === 'dict') {
          return {
            ...tItem,

            // handle dict column title
            title: tItem.useDictNameAsTitle
              ? () => t(`dict.name.${tItem.dictType}`)
              : tItem.title,

            filterOptions: computed(() =>
              tItem.filter
                ? AppDictMap.get(tItem.dictType)?.dictData.map(i => ({
                  value: i.value,
                  label: t(i.label!),
                }))
                : [],
            ),

            filterOptionValue:
              ApiTableListParams.value.query[tItem.key] ?? null,

            render(p) {
              const res = AppDictMap.get(tItem.dictType)

              const target = res?.dictData.find(
                i => i.value === (p[tItem.key] as boolean).toString(),
              )

              if (!target?.label)
                return

              if (tItem.tagProps)
                return <n-tag {...tItem.tagProps(p)}>{t(target.label)}</n-tag>

              if (target.tagType)
                return <n-tag type={target.tagType}>{t(target.label)}</n-tag>

              return <span>{t(target.label)}</span>
            },
          }
        }

        // action
        if (tItem.extendType === 'action') {
          const isShow = (t: WTable.ColumnActionType) =>
            (tItem.extendActionType ?? ['read', 'delete']).includes(t)

          return {
            ...tItem,

            render(rowData, rowIndex) {
              const buttonGroups: {
                key: WTable.ColumnActionType
                content: any
              }[] = [
                {
                  key: 'create',
                  content: (
                    <w-button
                      auth={props.value.auths?.create}
                      icon-button
                      icon="ant-design:plus-outlined"
                      text-prop={t('app.button.create')}
                      onClick={() =>
                        tItem.onExtendActionType!({
                          type: 'create',
                          rowData,
                          rowIndex,
                        })
                      }
                      type="success"
                    ></w-button>
                  ),
                },
                {
                  key: 'read',
                  content: (
                    <w-button
                      auth={props.value.auths?.read}
                      icon-button
                      icon="ant-design:edit-outlined"
                      text-prop={t('app.button.read')}
                      onClick={() =>
                        tItem.onExtendActionType!({
                          type: 'read',
                          rowData,
                          rowIndex,
                        })
                      }
                      type="info"
                    ></w-button>
                  ),
                },
                {
                  key: 'delete',
                  content: (
                    <w-button
                      auth={props.value.auths?.delete}
                      confirm
                      icon-button
                      icon="ant-design:delete-outlined"
                      text-prop={t('app.button.delete')}
                      onClick={() =>
                        tItem.onExtendActionType!({
                          type: 'delete',
                          rowData,
                          rowIndex,
                        })
                      }
                      type="error"
                    ></w-button>
                  ),
                },
                {
                  key: 'detail',
                  content: (
                    <w-button
                      auth={props.value.auths?.read}
                      icon-button
                      icon="ant-design:eye-outlined"
                      text-prop={t('app.button.detail')}
                      onClick={() =>
                        tItem.onExtendActionType!({
                          type: 'detail',
                          rowData,
                          rowIndex,
                        })
                      }
                      type="success"
                    ></w-button>
                  ),
                },
              ]

              const extendActionButtons = tItem.extendActionButtons
                ?.filter(i => (i?._show ? i._show(rowData) : true))
                .map(i => <w-button {...omit(i, ['_show', '_type'])} onClick={() =>
                  tItem.onExtendActionType!({
                    type: i._type,
                    rowData,
                    rowIndex,
                  })
                }></w-button>)

              return (
                <div class="flex items-center justify-center space-x-2 whitespace-nowrap">
                  {sortBy(buttonGroups, i =>
                    tItem.extendActionType?.indexOf(i.key),
                  )
                    .filter(i => isShow(i.key))
                    .map(i => i.content)
                    .concat(extendActionButtons)}
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
          !whiteList[0].includes(i.type!)
          && !whiteList[1].includes(i.extendType!)
        )
          return i.width || i.minWidth
        else
          return 80
      })
      .filter(i => i)

    if (
      widths?.length !== 0
      && widths?.length === props.value.columns?.length
    ) {
      const w = widths?.reduce((p, c) => (p as number) + (c as number), 0)

      setProps({ scrollX: w })
    }
    else {
      AppWarn(
        `Table with 'localeUniqueKey' ${props.value.localeUniqueKey} has a column without width. This may cause 'scrollX' calculate error.`,
      )
    }
  }

  onMounted(() => {
    // auto handle scrollX
    handleScrollX()
  })

  return { columns }
}
