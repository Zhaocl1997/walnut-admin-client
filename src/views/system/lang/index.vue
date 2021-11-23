<template>
  <div>
    <w-table @hook="registerTable"></w-table>

    <w-form @hook="registerForm" :model="formData"></w-form>
  </div>
</template>

<script lang="tsx">
  export default defineComponent({
    name: 'Lang',
  })
</script>

<script lang="tsx" setup>
  import { formatTime } from 'easy-fns-ts'

  import { langAPI } from '/@/api/system/lang'

  import { useInitialState } from '/@/utils'

  // main

  const tableData = ref<AppLang[]>([])
  const tableDataTotal = ref(0)
  const tableDataPage = ref(1)
  const tableDataPageSize = ref(10)
  const tableDataLoading = ref(false)

  const actionType = ref<'create' | 'update'>('create')

  const {
    stateRef: formData,
    setState,
    resetState,
  } = useInitialState<AppLang>({
    lang: '',
    description: '',
    status: true,
    order: 0,
  })

  const onGetTableData = async () => {
    tableDataLoading.value = true

    const res = await langAPI.list({
      page: tableDataPage.value,
      pageSize: tableDataPageSize.value,
    })

    tableData.value = res.data
    tableDataTotal.value = res.total
    tableDataLoading.value = false
  }

  onMounted(() => {
    onGetTableData()
  })

  const onCreate = () => {
    actionType.value = 'create'

    const { done } = onOpen()
    done()
  }

  const onOpenDrawer = async (id: string) => {
    const { done } = onOpen()

    actionType.value = 'update'

    try {
      const res = await langAPI.read(id)
      setState(res)
    } finally {
      done()
    }
  }

  const onUpdatePage = async (page: number) => {
    tableDataPage.value = page
    await onGetTableData()
  }

  const onUpdatePageSize = async (pageSize: number) => {
    tableDataPageSize.value = pageSize
    await onGetTableData()
  }

  const [registerTable] = useTable<AppLang>({
    onAction: ({ type }) => {
      switch (type) {
        case 'create':
          onCreate()

          break

        default:
          break
      }
    },

    actionList: ['create'],

    remote: true,

    rowKey: (row) => row._id,

    loading: tableDataLoading,

    // @ts-ignore
    data: tableData,

    pagination: {
      itemCount: tableDataTotal,
      page: tableDataPage,
      pageSize: tableDataPageSize,
      showSizePicker: true,
      showQuickJumper: true,
      pageSizes: [10, 30, 50],
      onChange: onUpdatePage,
      // TODO naive bug , trigger twice
      // onUpdatePage,
      onUpdatePageSize,
    },

    columns: [
      {
        title: 'Language',
        key: 'lang',
        width: 200,
        align: 'center',
      },

      {
        title: 'Description',
        key: 'description',
        width: 200,
        align: 'center',
      },

      {
        title: 'Order',
        key: 'order',
        width: 80,
        align: 'center',
      },
      {
        title: 'Status',
        key: 'status',
        width: 100,
        align: 'center',
        extendType: 'formatter',
        formatter: (row) => (row.status ? 'Normal' : 'Disabled'),
      },

      {
        title: 'Created At',
        key: 'createdAt',
        width: 200,
        extendType: 'formatter',
        formatter: (row) => formatTime(row.createdAt!),
        align: 'center',
      },

      {
        title: 'Updated At',
        key: 'updatedAt',
        width: 200,
        extendType: 'formatter',
        formatter: (row) => formatTime(row.updatedAt!),
        align: 'center',
      },

      {
        title: 'Action',
        key: 'action',
        extendType: 'action',
        extendActionType: ['read'],
        onRead: (row) => {
          onOpenDrawer(row._id!)
        },
      },
    ],
  })

  const [registerForm, { onOpen }] = useForm<AppLang>({
    preset: 'drawer',

    labelWidth: '140px',

    baseRules: true,

    advancedProps: {
      title: computed(() =>
        actionType.value === 'create'
          ? 'Create Language'
          : 'Update Existing Language'
      ),
      width: '500',
      onYes: async (handler) => {
        await handler(langAPI[actionType.value].bind(langAPI), formData.value)
        resetState()
        await onGetTableData()
      },
      onNo: (handler) => {
        resetState()
        handler()
      },
    },

    schemas: [
      {
        type: 'Base:Input',
        formProp: {
          path: 'lang',
          label: 'Language',
        },
        componentProp: {
          clearable: true,
        },
      },
      {
        type: 'Base:Input',
        formProp: {
          path: 'description',
          label: 'Description',
        },
        componentProp: {
          clearable: true,
          type: 'textarea',
        },
      },
      {
        type: 'Base:InputNumber',
        formProp: {
          path: 'order',
          label: 'Order',
        },
        componentProp: {
          clearable: true,
        },
      },
      {
        type: 'Base:Switch',
        formProp: {
          path: 'status',
          label: 'Role status',
        },
        componentProp: {
          checkedText: 'Enabled',
          uncheckedText: 'Disable',
        },
      },
    ],
  })
</script>
