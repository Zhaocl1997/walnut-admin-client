<template>
  <div>
    <w-table @hook="registerTable"></w-table>
    <w-form @hook="registerForm" :model="formData"></w-form>
  </div>
</template>

<script lang="ts">
  export default defineComponent({
    name: 'Menu',
  })
</script>

<script lang="ts" setup>
  import {
    arrToTree,
    formatTime,
    orderTree,
    formatTree,
    findPath,
  } from 'easy-fns-ts'

  import { menuAPI } from '/@/api/system/menu'

  import { getViewsOptions, deepKeys } from './utils'
  import { useInitialState } from '/@/utils'
  import { MenuTernalConst, MenuTypeConst } from '/@/const'

  type BaseOptions = { value: string; label: string }[]

  const menuTypeOptions: BaseOptions = [
    {
      value: MenuTypeConst.CATALOG,
      label: 'Catalog',
    },
    {
      value: MenuTypeConst.MENU,
      label: 'Menu',
    },
    {
      value: MenuTypeConst.ELEMENT,
      label: 'Element',
    },
  ]

  const menuTernalOptions: BaseOptions = [
    {
      value: MenuTernalConst.NONE,
      label: 'Normal',
    },
    {
      value: MenuTernalConst.EXTERNAL,
      label: 'External',
    },
    {
      value: MenuTernalConst.INTERNAL,
      label: 'Internal',
    },
  ]

  const { viewOptions } = getViewsOptions()
  const nameOptions = viewOptions.map((i) => ({
    value: i.name,
    label: i.name,
  }))

  const { getLocaleMessage, locale, t } = useAppI18n()
  const {
    stateRef: formData,
    setState,
    resetState,
  } = useInitialState<AppMenu>({
    path: '',
    type: 'catalog',
    ternal: 'none',
    order: 0,
    cache: false,
    status: true,
    show: true,
    affix: false,
  })

  // ref
  const coreData = ref<TreeDataItem<AppMenu>[]>([])
  const actionType = ref<'create' | 'update'>('create')

  // computed
  const getLocaleCoreData = computed(() =>
    formatTree<AppMenu>(coreData.value, {
      format: (node) => ({ ...node, title: t(node.title) }),
    })
  )
  const getTableData = computed(() => getLocaleCoreData.value[0]?.children)
  const getTitleList = computed(() =>
    (
      Array.from(deepKeys(getLocaleMessage(locale.value))) as BaseOptions
    ).filter(
      (i) => i.value.includes('system.menu') || i.value.includes('common.base')
    )
  )
  const getCurrentNode = computed(() =>
    findPath<AppMenu>(unref(coreData), (n) => n._id === formData.value.pid)
  )
  const getTreeSelectExpandedKeys = computed(() =>
    (getCurrentNode.value as AppMenu[])?.map((i) => i._id!)
  )
  const getRoutePathPrefix = computed(() =>
    !getCurrentNode.value
      ? '/'
      : (getCurrentNode.value as AppMenu[]).map((item) => item.path).join('/') +
        '/'
  )

  // init function
  const onGetList = async () => {
    const res = await menuAPI.list()

    // build, order and format
    const data = formatTree<AppMenu>(
      orderTree<AppMenu>(arrToTree<AppMenu>(res.data, { id: '_id' })),
      {
        format: (node) =>
          node.children.length === 0
            ? {
                ...node,
                children: null,
              }
            : node,
      }
    )

    coreData.value = data
  }

  // create new menu
  const onCreate = async (id: string) => {
    actionType.value = 'create'

    setState({ pid: id })

    onOpen!()
  }

  // read by id
  const onRead = async (id: string) => {
    actionType.value = 'update'

    const res = await menuAPI.read(id)

    setState(res)

    onOpen!()
  }

  // delete
  const onDelete = async (id: string) => {
    const ret = await menuAPI.delete(id)
    if (ret) {
      useAppMessage().success('Operation Success!')
      await onGetList()
    }
  }

  onMounted(() => {
    onGetList()
  })

  const [registerTable] = useTable<AppMenu>({
    rowKey: (row) => row._id,

    columns: [
      {
        title: 'Name',
        key: 'title',
        width: 200,
      },

      {
        title: 'Type',
        key: 'type',
        width: 80,
      },

      {
        title: 'Icon',
        key: 'icon',
        extendType: 'icon',
        extendIconName: (row) => row.icon!,
      },

      {
        title: 'Order',
        key: 'order',
        width: 80,
      },

      {
        title: 'Visible',
        key: 'show',
        width: 100,
        extendType: 'formatter',
        formatter: (row) => (row.show ? 'Visible' : 'Invisible'),
      },

      {
        title: 'Status',
        key: 'status',
        width: 100,
        extendType: 'formatter',
        formatter: (row) => (row.status ? 'Normal' : 'Disabled'),
      },

      {
        title: 'Created At',
        key: 'createdAt',
        width: 200,
        extendType: 'formatter',
        formatter: (row) => formatTime(row.createdAt!),
      },

      {
        title: 'Updated At',
        key: 'updatedAt',
        width: 200,
        extendType: 'formatter',
        formatter: (row) => formatTime(row.updatedAt!),
      },

      {
        title: 'Action',
        key: 'action',
        extendType: 'action',
        onCreate: (row) => {
          onCreate(row._id!)
        },
        onRead: (row) => {
          onRead(row._id!)
        },
        onDelete: (row) => {
          onDelete(row._id!)
        },
      },
    ],

    data: getTableData,
  })

  const [registerForm, { onOpen }] = useForm<AppMenu>({
    preset: 'drawer',

    labelWidth: '140px',

    schemas: [
      {
        type: 'Extend:Divider',
        componentProp: {
          title: 'Base Config',
        },
      },

      {
        type: 'Base:TreeSelect',
        formProp: {
          path: 'pid',
          label: 'Parent node',
        },
        componentProp: {
          options: getLocaleCoreData,
          defaultExpandedKeys: getTreeSelectExpandedKeys,
          labelField: 'title',
          keyField: '_id',
        },
      },

      {
        type: 'Base:Radio',
        formProp: {
          path: 'type',
          label: 'Menu Type',
        },
        componentProp: {
          options: menuTypeOptions,
        },
      },

      {
        type: 'Base:Radio',
        formProp: {
          path: 'ternal',
          label: 'External/Internal',
        },
        componentProp: {
          options: menuTernalOptions,
        },
        extraProp: {
          vIf: ({ formData }) => formData.type === MenuTypeConst.MENU,
        },
      },

      {
        type: 'Base:Input',
        formProp: {
          path: 'url',
          label: 'Url Link',
        },
        componentProp: {
          placeholder: 'External/Internal url.',
          clearable: true,
        },
        extraProp: {
          vIf: ({ formData }) =>
            formData.type === MenuTypeConst.MENU && formData.ternal !== 'none',
        },
      },

      {
        type: 'Base:Switch',
        formProp: {
          path: 'status',
          label: 'Menu status',
          labelHelpMessage: 'False means will not be able to get from backend.',
        },
        componentProp: {
          checkedText: 'Enabled',
          uncheckedText: 'Disable',
        },
        extraProp: {
          vIf: ({ formData }) => formData.type !== MenuTypeConst.ELEMENT,
        },
      },

      {
        type: 'Extend:Divider',
        componentProp: {
          title: 'Router Base',
        },
      },

      {
        type: 'Base:Input',
        formProp: {
          path: 'path',
          label: 'Path',
        },
        componentProp: {
          placeholder: 'Route path field.',
          clearable: true,
          prefix: getRoutePathPrefix,
        },
      },

      // `catelog` type is `Input`
      {
        type: 'Base:Input',
        formProp: {
          path: 'name',
          label: 'Name',
        },
        componentProp: {
          placeholder: 'Route name field.',
          clearable: true,
          valueModifiers: {
            capitalize: true,
          },
        },
        extraProp: {
          vIf: ({ formData }) =>
            formData.type === MenuTypeConst.CATALOG ||
            formData.ternal !== 'none',
        },
      },

      // `menu` type is `Select`
      // `name` field is read from the vue file
      {
        type: 'Base:Select',
        formProp: {
          path: 'name',
          label: 'Name',
        },
        componentProp: {
          placeholder: 'Route name field.',
          clearable: true,
          filterable: true,
          options: nameOptions as BaseOptions,
        },
        extraProp: {
          vIf: ({ formData }) =>
            formData.type === MenuTypeConst.MENU && formData.ternal === 'none',
        },
      },

      // Auto bump `views` children vue file
      // To avoid to appear in options, you can set `defaultView: false` in the same level of `setup`
      {
        type: 'Base:Select',
        formProp: {
          path: 'component',
          label: 'Component',
        },
        componentProp: {
          placeholder: 'Route component field.',
          clearable: true,
          options: viewOptions as BaseOptions,
          filterable: true,
          onUpdateValue: (val: string) => {
            // Get the name property automatically from vue `name` property
            const target = viewOptions.find((item) => item.value === val)
            formData.value.name = target?.name
          },
        },
        extraProp: {
          vIf: ({ formData }) =>
            formData.type === MenuTypeConst.MENU && formData.ternal === 'none',
        },
      },

      {
        type: 'Extend:Divider',
        componentProp: {
          title: 'Router Meta',
        },
      },

      {
        type: 'Base:Select',
        formProp: {
          path: 'title',
          label: 'Title',
        },
        componentProp: {
          placeholder: 'Title',
          clearable: true,
          filterable: true,
          options: getTitleList,
        },
      },

      {
        type: 'Extend:IconPicker',
        formProp: {
          path: 'icon',
          label: 'Icon',
        },
        extraProp: {
          vIf: ({ formData }) => formData.type !== MenuTypeConst.ELEMENT,
        },
      },

      {
        type: 'Base:InputNumber',
        formProp: {
          path: 'order',
          label: 'Order',
        },
        componentProp: {
          placeholder: 'Menu order displayed aside',
          clearable: true,
        },
      },

      {
        type: 'Base:Switch',
        formProp: {
          path: 'cache',
          label: 'Keep Alive',
          labelHelpMessage: 'False means will not be cached in router.',
        },
        componentProp: {
          checkedText: 'Cached',
          uncheckedText: 'Uncache',
        },
        extraProp: {
          vIf: ({ formData }) =>
            formData.type === MenuTypeConst.MENU && formData.ternal === 'none',
        },
      },

      {
        type: 'Base:Switch',
        formProp: {
          path: 'show',
          label: 'Display aside',
          labelHelpMessage:
            'False means will not display aside but still in store.',
        },
        componentProp: {
          checkedText: 'Display',
          uncheckedText: 'Hidden',
        },
        extraProp: {
          vIf: ({ formData }) => formData.type !== MenuTypeConst.ELEMENT,
        },
      },

      {
        type: 'Base:Switch',
        formProp: {
          path: 'affix',
          label: 'Affixed Tab',
          labelHelpMessage:
            'True means will be affixed in tabs, not closable or removable.',
        },
        componentProp: {
          checkedText: 'Affixed',
          uncheckedText: 'Normal',
        },
      },
    ],

    baseRules: true,

    advancedProps: {
      title: computed(() =>
        actionType.value === 'create'
          ? 'Create New Menu'
          : 'Update Existing Menu'
      ),
      width: '500',
      onYes: async (handler) => {
        await handler(menuAPI, menuAPI[actionType.value], formData.value)
        resetState()
        await onGetList()
      },
      onNo: (handler) => {
        resetState()
        handler()
      },
    },
  })
</script>
