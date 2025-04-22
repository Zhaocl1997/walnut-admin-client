import type { DropdownOption } from 'naive-ui'
import type { WTable } from '../types'
import { omit } from 'lodash-es'

import { getTableTranslated } from '../utils'

// Extend Naive UI columns
export function useTableColumns(props: ComputedRef<WTable.Props>, ApiTableListParams: Ref<WalnutBaseListParams>, setProps: WTable.SetProps) {
  const columns = ref<WTable.Column[]>([])
  const { t } = useAppI18n()
  const userPermission = useAppStoreUserPermission()

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
            >
            </w-message>
          )}
        </>
      ),

      // this is used for column settings to display text correctly
      _titleText: () => getTableTranslated(props, item),
    }
  }

  watchEffect(async () => {
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
                ? getDictDataFromMap(tItem.dictType)?.map(i => ({
                  value: i.value,
                  label: t(i.label!),
                }))
                : [],
            ),

            filterOptionValue:
              ApiTableListParams.value.query![tItem.key] ?? null,

            render(p) {
              const target = getDictTarget(tItem.dictType, p[tItem.key] as string)

              if (tItem.tagProps)
                return <n-tag {...tItem.tagProps(p)}>{t(target.label!)}</n-tag>

              if (target.tagType)
                return <n-tag type={target.tagType}>{t(target.label!)}</n-tag>

              return <span>{t(target.label!)}</span>
            },
          }
        }

        // action
        if (tItem.extendType === 'action') {
          const defaultBuiltInButtons: WTable.ExtendType.ActionButtons<any>[] = [
            {
              _builtInType: 'create',
              auth: props.value.auths?.create,
              iconButton: true,
              icon: 'ant-design:plus-outlined',
              textProp: () => t('app.button.create'),
              type: 'success',
            },
            {
              _builtInType: 'read',
              auth: props.value.auths?.read,
              iconButton: true,
              icon: 'ant-design:edit-outlined',
              textProp: () => t('app.button.read'),
              type: 'info',
            },
            {
              _builtInType: 'delete',
              auth: props.value.auths?.delete,
              iconButton: true,
              icon: 'ant-design:delete-outlined',
              textProp: () => t('app.button.delete'),
              type: 'error',
            },
            {
              _builtInType: 'detail',
              auth: props.value.auths?.read,
              iconButton: true,
              icon: 'ant-design:eye-outlined',
              textProp: () => t('app.button.detail'),
              type: 'success',
            },
          ]

          const bs = toRaw(tItem.actionButtons)
            .sort((a, b) => getBoolean(a._dropdown, false) - getBoolean(b._dropdown, false))
            .map((item) => {
              const button = defaultBuiltInButtons.find(b => b._builtInType === item._builtInType)
              return button ? Object.assign(button, item) : item
            })

          return {
            ...tItem,

            render(rowData, rowIndex) {
              const onDropdownSelect = (key: string) => {
                tItem.onActionButtonsClick({
                  type: key,
                  rowData,
                  rowIndex,
                })
              }

              const isShow = (i: WTable.ExtendType.ActionButtons<RowData>) => getFunctionBoolean(i._show, rowData)
              const isDisabled = (i: WTable.ExtendType.ActionButtons<RowData>) => getFunctionBoolean(i._disabled, rowData, false)

              const visibleButtons = bs.filter(i => isShow(i)).map(i => omit(i, '_show'))
              const normalButtons = visibleButtons.filter(i => !i._dropdown).map(i => omit(i, '_dropdown'))
              const dropdownButtons = visibleButtons.filter(i => i._dropdown).map(i => omit(i, '_dropdown'))

              const renderNormalButtons = normalButtons.map(i => (
                <WButton
                  {...omit(i, '_builtInType')}
                  disabled={isDisabled(i)}
                  onClick={() =>
                    tItem.onActionButtonsClick({
                      type: i._builtInType,
                      rowData,
                      rowIndex,
                    })}
                >
                </WButton>
              ))

              const dropdownOptions: DropdownOption[] = dropdownButtons.map((i) => {
                return {
                  key: i._builtInType,
                  label: i.textProp,
                  disabled: isDisabled(i),
                  // the show below is actually used for permission
                  // the button that do not shown has been filtered early
                  show: userPermission.hasPermission(i.auth),
                  icon: i?.icon ? () => <WIconButton {...omit(i, ['_builtInType', '_dropdown'])}></WIconButton> : undefined,
                }
              })

              return (
                <div class="flex items-center justify-center whitespace-nowrap space-x-2">
                  {renderNormalButtons}

                  {dropdownButtons.length !== 0 && (
                    <n-dropdown size="small" trigger="click" options={dropdownOptions} onSelect={onDropdownSelect}>
                      <WIconButton icon-props={{ icon: 'ant-design:more-outlined' }} button-props={{ text: true }}></WIconButton>
                    </n-dropdown>
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
                <WIcon
                  width="24"
                  class="-mb-2"
                  icon={
                    typeof tItem.extendIconName === 'string'
                      ? tItem.extendIconName
                      : tItem.extendIconName(p)
                  }
                >
                </WIcon>
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
        ) {
          return i.width || i.minWidth
        }
        else {
          return 80
        }
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
      AppConsoleWarn('WTable', `Table with 'localeUniqueKey' ${props.value.localeUniqueKey} has a column without width. This may cause 'scrollX' calculate error.`)
    }
  }

  const handleDictData = async () => {
    const usedDictTypes = props.value.columns?.filter(i => i.extendType === 'dict')?.map(i => i.dictType).filter(Boolean) as string[]
    await initDict(usedDictTypes)
  }

  onMounted(() => {
    // auto handle scrollX
    handleScrollX()
  })

  onBeforeMount(async () => {
    // init dict data
    await handleDictData()
  })

  return { columns }
}
