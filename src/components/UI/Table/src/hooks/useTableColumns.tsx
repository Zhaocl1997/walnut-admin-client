import type { DropdownOption } from 'naive-ui'
import type { FilterOption } from 'naive-ui/es/data-table/src/interface'
import type { WTable } from '../types'
import WAppNotAuthorized from '@/components/App/AppNotAuthorized'
// TODO 111
import WDictLabel from '@/components/Business/DictLabel'
import WMessage from '@/components/Extra/Message'
import WIcon from '@/components/UI/Icon'
import WIconButton from '@/components/UI/IconButton'
import { omit } from 'lodash-es'
import { NA, NDropdown, NTag } from 'naive-ui'

import { getTableTranslated } from '../utils'

// Extend Naive UI columns
export function useTableColumns<T>(propsCtx: IHooksUseProps<WTable.Props<T>>, apiListParams: Ref<WalnutBaseListParams<T>>) {
  const columns = ref<WTable.Column<T>[]>([])
  const { t } = useAppI18n()
  const userPermission = useAppStoreUserPermission()
  const { getProps: props, setProps } = propsCtx

  const builtInType = ['expand', 'selection']

  const transformColumn = (item: WTable.Column<T>) => {
    if (builtInType.includes(item.type))
      return item

    return {
      ...item,
      title: () => (
        <>
          {getTableTranslated(props, item)}
          {item.titleHelpMessage && (
            <WMessage
              msg={getTableTranslated(props, item, true)}
              class="inline"
            >
            </WMessage>
          )}
        </>
      ),
    }
  }

  watchEffect(async () => {
    // @ts-expect-error computed error
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
              return tItem.formatter ? tItem.formatter(p) : p
            },
          }
        }

        // index based on apiListParams
        if (tItem.extendType === 'index') {
          return {
            ...tItem,
            title: t('app.base.index'),
            width: 70,
            render(_, index) {
              return (
                (apiListParams.value.page?.page - 1)
                * apiListParams.value.page?.pageSize
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
              return <span onClick={() => tItem.onClick(p)}><NA>{tItem.formatter ? tItem.formatter(p) : p[tItem.key]}</NA></span>
            },
          }
        }

        // tag
        if (tItem.extendType === 'tag') {
          return {
            ...tItem,
            render(p) {
              return (
                <NTag {...tItem.tagProps(p)}>{tItem.formatter ? tItem.formatter(p) : p}</NTag>
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

            filterOptions: computed<FilterOption[]>(() =>
              tItem.filter
                ? getDictDataFromMap(tItem.dictType)?.map(i => ({
                  value: i.value,
                  label: t(i.label!),
                }))
                : [],
            ),

            filterOptionValue:
              apiListParams.value.query![tItem.key] ?? null,

            render(p) {
              return <WDictLabel dictType={tItem.dictType} dictValue={p[tItem.key]}></WDictLabel>
            },
          }
        }

        // action
        if (tItem.extendType === 'action') {
          const defaultBuiltInButtons: WTable.ExtendType.ActionButtons<T>[] = [
            {
              _builtInType: 'create',
              buttonProps: {
                auth: props.value.auths?.create,
                type: 'success',
                size: 'small',
                text: true,
                textProp: () => t('app.button.create'),
              },
              iconProps: {
                icon: 'ant-design:plus-outlined',
              },
            },
            {
              _builtInType: 'read',
              buttonProps: {
                auth: props.value.auths?.read,
                type: 'info',
                size: 'small',
                text: true,
                textProp: () => t('app.button.read'),
              },
              iconProps: {
                icon: 'ant-design:edit-outlined',
              },
            },
            {
              _builtInType: 'delete',
              buttonProps: {
                auth: props.value.auths?.delete,
                type: 'error',
                size: 'small',
                text: true,
                textProp: () => t('app.button.delete'),
              },
              iconProps: {
                icon: 'ant-design:delete-outlined',
              },
              confirm: true,
            },
            {
              _builtInType: 'detail',
              buttonProps: {
                auth: props.value.auths?.read,
                type: 'success',
                size: 'small',
                text: true,
                textProp: () => t('app.button.detail'),
              },
              iconProps: {
                icon: 'ant-design:eye-outlined',
              },
            },
          ]

          const bs = toRaw(tItem.columnBuiltInActions.concat(toRaw(tItem?.columnExtraActions ?? [])))
            .sort((a, b) => getBoolean(a._dropdown, false) - getBoolean(b._dropdown, false))
            .map((item) => {
              const button = defaultBuiltInButtons.find(b => b._builtInType === item._builtInType)
              return button ? Object.assign(button, item) : item
            })

          const onDropdownSelect = (key: WTable.ColumnActionType, rowData, rowIndex) => {
            const target = bs.find(i => i._builtInType === key)
            target && target.onPresetClick(rowData, rowIndex)
          }

          const renderDropdownEmpty: DropdownOption[] = [
            {
              type: 'render',
              key: 'empty',
              render: () => {
                return <div class="scale-80 px-2"><WAppNotAuthorized preset-width="100%" perset-height="100px"></WAppNotAuthorized></div>
              },
            },
          ]

          return {
            ...tItem,

            render(rowData, rowIndex) {
              const isShow = (i: WTable.ExtendType.ActionButtons<T>) => getFunctionBoolean(i._show, rowData)
              const isDisabled = (i: WTable.ExtendType.ActionButtons<T>) => getFunctionBoolean(i._disabled, rowData, false)

              const visibleButtons = bs.filter(i => isShow(i)).map(i => omit(i, '_show'))

              const normalButtons = visibleButtons.filter(i => !i._dropdown).map(i => omit(i, '_dropdown'))
              const dropdownButtons = visibleButtons.filter(i => i._dropdown).map(i => omit(i, '_dropdown'))

              const renderButton = (i: WTable.ExtendType.ActionButtons<T>) => (
                <WIconButton
                  button-props={{
                    ...i.buttonProps,
                    disabled: isDisabled(i),
                    onClick: !i.confirm ? () => i.onPresetClick(rowData, rowIndex) : null,
                  }}
                  icon-props={i.iconProps}
                  confirm={i.confirm}
                  onConfirm={() => i.onPresetClick(rowData, rowIndex)}
                >
                </WIconButton>
              )

              const renderNormalButtons = normalButtons.map(renderButton)

              const dropdownOptions: DropdownOption[]
              = dropdownButtons
                .filter(i => userPermission.hasPermission(i.buttonProps?.auth))
                .map(i => i.iconProps?.icon
                  ? {
                      type: 'render',
                      key: i._builtInType,
                      disabled: isDisabled(i),
                      render: i?.iconProps?.icon ? () => <div class="mx-2">{renderButton(i)}</div> : undefined,
                    }
                  : {
                      key: i._builtInType,
                      label: i.buttonProps.textProp,
                      disabled: isDisabled(i),
                    })

              return (
                <div class="flex flex-row flex-nowrap items-center justify-center gap-x-2">
                  {renderNormalButtons}

                  <NDropdown size="small" trigger="click" options={dropdownOptions.length ? dropdownOptions : renderDropdownEmpty} onSelect={key => onDropdownSelect(key, rowData, rowIndex)}>
                    <div>
                      <WIconButton icon-props={{ icon: 'ant-design:more-outlined' }} button-props={{ text: false }}></WIconButton>
                    </div>
                  </NDropdown>
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

  const onScrollX = () => {
    // first is naive column type
    // second is extend column type
    const whiteList = [
      builtInType,
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
      .filter(Boolean)

    if (
      widths?.length !== 0
      && widths?.length === props.value.columns?.length
    ) {
      const w = widths?.reduce((p, c) => (p as number) + (c as number), 0)

      setProps({ scrollX: w })
    }
    else {
      console.warn('WTable', `Table with 'localeUniqueKey' ${props.value.localeUniqueKey} has a column without width. This may cause 'scrollX' calculate error.`)
    }
  }

  const onDictData = async () => {
    if (props.value.columns.some(i => i.extendType === 'dict')) {
      const usedDictTypes = props.value.columns?.filter(i => i.extendType === 'dict')?.map(i => i.dictType).filter(Boolean)
      await initDict(usedDictTypes)
    }
  }

  onMounted(() => {
    // auto handle scrollX
    onScrollX()
  })

  onBeforeMount(async () => {
    // init dict data
    await onDictData()
  })

  return columns
}
