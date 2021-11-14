<template>
  <div>
    <w-table @hook="registerTable"></w-table>

    <w-form @hook="registerForm" :model="formData"></w-form>
  </div>
</template>

<script lang="tsx">
  export default defineComponent({
    name: 'Locale',
  })
</script>

<script lang="tsx" setup>
  import type { WForm } from '/@/components/UI/Form'

  import { formatTime } from 'easy-fns-ts'

  import { localeAPI } from '/@/api/system/locale'
  import { langAPI } from '/@/api/system/lang'

  import { useInitialState } from '/@/utils'

  // main

  const tableData = ref<AppLocale[]>([])
  const tableDataTotal = ref(0)
  const tableDataPage = ref(1)
  const tableDataPageSize = ref(10)
  const tableDataLoading = ref(false)
  const langList = ref<BaseOptionDataItem[]>([])

  const actionType = ref<'create' | 'update'>('create')

  const {
    stateRef: formData,
    setState,
    resetState,
  } = useInitialState<AppLocale>({
    key: '',
  })

  const onGetTableData = async () => {
    tableDataLoading.value = true

    const res = await localeAPI.list<AppLocale>({
      page: tableDataPage.value,
      pageSize: tableDataPageSize.value,
    })

    tableData.value = res.data
    tableDataTotal.value = res.total
    tableDataLoading.value = false
  }

  const onGetLangList = async () => {
    const res = await langAPI.list()
    langList.value = res.data.map((i) => ({
      label: i.description,
      value: i._id,
    }))
  }

  onMounted(() => {
    onGetTableData()
    onGetLangList()
  })

  const onCreate = () => {
    actionType.value = 'create'

    const { done } = onOpen()
    done()
  }

  const onOpenDrawer = async (id: string) => {
    console.log(id, 123)

    const { done } = onOpen()

    actionType.value = 'update'

    try {
      const res = await localeAPI.read(id)
      setState(res)
    } finally {
      done()
    }
  }

  const onDelete = async (id: string) => {
    const ret = await localeAPI.delete(id)
    if (ret) {
      useAppMessage().success('Operation Success!')
      await onGetTableData()
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

  const [registerTable] = useTable<
    Pick<AppLocale, '_id' | 'key' | 'createdAt' | 'updatedAt'> & {
      isCompleted: boolean
      process: number
    }
  >({
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
        title: 'Locale Key',
        key: 'key',
        width: 200,
        align: 'center',
      },

      {
        title: 'Process',
        key: 'process',
        width: 100,
        align: 'center',
        extendType: 'formatter',
        formatter: (row) => row.process * 100 + '%',
      },

      {
        title: 'Completed',
        key: 'isCompleted',
        width: 120,
        align: 'center',
        extendType: 'formatter',
        formatter: (row) => (row.isCompleted ? 'Finished' : 'Unfinished'),
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
        onDelete: (row) => {
          onDelete(row._id!)
        },
      },
    ],
  })

  const [registerForm, { onOpen }] = useForm<AppLocale>({
    preset: 'drawer',

    labelWidth: '140px',

    // baseRules: true,

    advancedProps: {
      title: computed(() =>
        actionType.value === 'create'
          ? 'Create Locale Message'
          : 'Update Existing Locale Message'
      ),
      width: '500',
      onYes: async (handler) => {
        await handler(localeAPI, localeAPI[actionType.value], formData.value)
        resetState()
        await onGetTableData()
      },
      onNo: (handler) => {
        resetState()
        handler()
      },
    },

    // TODO type error
    schemas: computed(() => [
      {
        type: 'Base:Input',
        formProp: {
          path: 'key',
          label: 'Locale Key',
        },
        componentProp: {
          clearable: true,
        },
      },

      ...langList.value.map<WForm.Schema.Item>((i) => ({
        type: 'Base:Input',
        formProp: {
          path: i.value as string,
          label: i.label,
        },
        componentProp: {
          clearable: true,
        },
      })),
    ]),
  })
</script>
