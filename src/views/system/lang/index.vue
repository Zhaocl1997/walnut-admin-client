<template>
  <div>
    <w-table @hook="registerTable"></w-table>

    <w-form @hook="registerForm" :model="formData"></w-form>
  </div>
</template>

<script lang="ts">
  export default defineComponent({
    name: 'Lang',
  })
</script>

<script lang="ts" setup>
  import { formatTime } from 'easy-fns-ts'

  import { langAPI } from '/@/api/system/lang'

  import { useInitialState } from '/@/utils'

  // ref
  const actionType = ref<ActionType>('')

  // state
  const {
    stateRef: formData,
    setState: setFormData,
    resetState: resetFormData,
  } = useInitialState<AppLang>({
    lang: '',
    description: '',
    status: true,
    order: 0,
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
      const res = await langAPI.read(id)
      setFormData(res)
    } finally {
      done()
    }
  }

  // table
  const [registerTable, { onInit, onDelete }] = useTable<AppLang>({
    // localeUniqueKey: 'locale',

    rowKey: (row) => row._id,

    maxHeight: 600,

    actionList: ['create'],

    onAction: ({ type }) => {
      switch (type) {
        case 'create':
          onCreateAndOpen()

          break

        default:
          break
      }
    },

    apiProps: {
      // Table API Solution 1
      listApi: langAPI.list.bind(langAPI),
      // Table API Solution 2
      // api: (p) => AppAxios.post({ url: '/system/locale/list', data: p }),

      deleteApi: langAPI.delete.bind(langAPI),
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
        extendActionType: ['read', 'delete'],
        onRead: (row) => {
          onReadAndOpen(row._id!)
        },
        onDelete: (row) => {
          onDelete(row._id!)
        },
      },
    ],
  })

  // form
  const [registerForm, { onOpen }] = useForm<AppLang>({
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
          langAPI[actionType.value].bind(langAPI),
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
