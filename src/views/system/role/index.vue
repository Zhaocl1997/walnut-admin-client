<template>
  <div>
    <!-- <n-button @click="insert">insert</n-button> -->
    <w-table @hook="registerTable"></w-table>

    <w-form @hook="registerForm" :model="formData"></w-form>
  </div>
</template>

<script lang="tsx">
  export default defineComponent({
    name: 'Role',
  })
</script>

<script lang="tsx" setup>
  import { formatTime } from 'easy-fns-ts'

  import { roleAPI } from '/@/api/system/role'

  import { useInitialState } from '/@/utils'

  import Permission from './permission.vue'

  const roleData = Array.from({ length: 100 }).map(
    (i, index) =>
      ({
        roleName: `testRole${index + 1}`,
        description: `testDes${index + 1}`,
      } as AppRole)
  )

  const insert = () => {
    roleData.map(async (data) => {
      await roleAPI.create(data)
    })
  }

  // main

  const tableData = ref<AppRole[]>([])
  const tableDataTotal = ref(0)
  const tableDataPage = ref(1)
  const tableDataPageSize = ref(10)
  const tableDataLoading = ref(false)

  const actionType = ref<'create' | 'update'>('create')

  const {
    stateRef: formData,
    setState,
    resetState,
  } = useInitialState<AppRole>({
    roleName: '',
    description: '',
    status: true,
    menus: [],
  })

  const onGetTableData = async () => {
    tableDataLoading.value = true

    const res = await roleAPI.list({
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
      const res = await roleAPI.read(id)
      setState(res)
    } finally {
      done()
    }
  }

  const onDelete = async (id: string) => {
    const ret = await roleAPI.delete(id)
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

  const [registerTable] = useTable<AppRole>({
    onAction: ({ type }) => {
      switch (type) {
        case 'create':
          onCreate()

          break

        default:
          break
      }
    },

    actionList: ['create', 'delete'],

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
        type: 'selection',
      },

      {
        title: 'Role Name',
        key: 'roleName',
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
        title: 'Users Count',
        key: 'usersCount',
        width: 120,
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
        extendActionType: ['read', 'delete'],
        onRead: (row) => {
          onOpenDrawer(row._id!)
        },
        onDelete: (row) => {
          onDelete(row._id!)
        },
      },
    ],
  })

  const [registerForm, { onOpen }] = useForm<AppRole>({
    preset: 'drawer',

    labelWidth: '140px',

    baseRules: true,

    advancedProps: {
      title: computed(() =>
        actionType.value === 'create' ? 'Create Role' : 'Update Existing Role'
      ),
      width: '500',
      onYes: async (handler) => {
        await handler(roleAPI[actionType.value].bind(roleAPI), formData.value)
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
          path: 'roleName',
          label: 'Role Name',
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
      {
        type: 'Base:Render',
        formProp: {
          path: 'menus',
          label: 'Permission',
        },
        componentProp: {
          render: ({ formData }) => (
            <Permission v-model={[formData.menus, 'value']} />
          ),
        },
      },
    ],
  })
</script>
