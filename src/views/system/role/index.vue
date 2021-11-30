<template>
  <div>
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

  import MenuTree from './MenuTree.vue'

  // ref
  const actionType = ref<ActionType>('')

  // state
  const {
    stateRef: formData,
    setState: setFormData,
    resetState: resetFormData,
  } = useInitialState<AppRole>({
    roleName: '',
    description: '',
    status: true,
    menus: [],
  })

  const onCreateAndOpen = () => {
    actionType.value = 'create'

    const { done } = onOpen()

    done()
  }

  const onReadAndOpen = async (id: string) => {
    actionType.value = 'update'

    const { done } = onOpen()

    try {
      const res = await roleAPI.read(id)
      setFormData(res)
    } finally {
      done()
    }
  }

  // table
  const [registerTable, { onInit, onDelete, onDeleteMany }] = useTable<AppRole>(
    {
      rowKey: (row) => row._id,

      maxHeight: 600,

      striped: true,

      actionList: ['create', 'delete'],

      onAction: ({ type }) => {
        switch (type) {
          case 'create':
            onCreateAndOpen()
            break

          case 'delete':
            onDeleteMany()
            break

          default:
            break
        }
      },

      apiProps: {
        // Table API Solution 1
        listApi: roleAPI.list.bind(roleAPI),
        // Table API Solution 2
        // api: (p) => AppAxios.post({ url: '/system/locale/list', data: p }),

        deleteApi: roleAPI.delete.bind(roleAPI),

        deleteManyApi: roleAPI.deleteMany.bind(roleAPI),
      },

      // queryFormProps: {
      //   localeUniqueKey: 'locale',
      //   localeWithTable: true,
      //   span: 8,
      //   labelWidth: 100,
      //   schemas: [
      //     {
      //       type: 'Base:Select',
      //       formProp: {
      //         path: 'key',
      //       },
      //       componentProp: {
      //         clearable: true,
      //         options: ['app:', 'sys:', 'form:', 'table:'].map((i) => ({
      //           value: i,
      //           label: i,
      //         })),
      //       },
      //     },
      //     {
      //       type: 'Base:Input',
      //       formProp: {
      //         path: 'value',
      //       },
      //       componentProp: {
      //         clearable: true,
      //       },
      //     },
      //     {
      //       type: 'Extend:Query',
      //     },
      //   ],
      // },

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
          align: 'center',
          width: 180,
          extendType: 'action',
          extendActionType: ['read', 'delete'],
          onRead: (row) => {
            onReadAndOpen(row._id!)
          },
          onDelete: (row) => {
            onDelete(row._id!)
          },
        },
      ],
    }
  )

  // form
  const [registerForm, { onOpen }] = useForm<AppRole>({
    // localeUniqueKey: 'locale',

    // localeWithTable: true,

    preset: 'drawer',

    labelWidth: 140,

    baseRules: true,

    advancedProps: {
      actionType,
      width: 500,
      onYes: async (apiHandler) => {
        await apiHandler(
          // Form API Solution 1
          roleAPI[actionType.value].bind(roleAPI),
          // Form API Solution 2
          // (data) => AppAxios.put({ url: '/system/locale', data }),
          formData.value
        )
        resetFormData()
        await onInit()
      },
      onNo: (done) => {
        resetFormData()
        done()
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
          rule: false,
        },
        componentProp: {
          render: ({ formData }) => (
            <MenuTree v-model={[formData.menus, 'value']} checkable />
          ),
        },
      },
    ],
  })
</script>
