<template>
  <div>
    <w-table @hook="registerTable"></w-table>

    <w-form @hook="registerForm" :model="formData"></w-form>
  </div>
</template>

<script lang="ts">
  export default defineComponent({
    name: 'Locale',
  })
</script>

<script lang="ts" setup>
  import type { WForm } from '/@/components/UI/Form'

  import { formatTime } from 'easy-fns-ts'

  import { localeAPI } from '/@/api/system/locale'
  import { langAPI } from '/@/api/system/lang'

  import { useInitialState } from '/@/utils'

  // main
  const langList = ref<BaseOptionDataItem[]>([])

  const actionType = ref<'create' | 'update'>('create')

  const {
    stateRef: formData,
    setState,
    resetState,
  } = useInitialState<AppLocale & { oldKey?: string }>({
    key: '',
    oldKey: '',
  })

  const onGetLangList = async () => {
    const res = await langAPI.list()
    langList.value = res.data.map((i) => ({
      label: i.description,
      value: i._id,
    }))
  }

  onMounted(() => {
    onGetLangList()
  })

  const onCreate = () => {
    actionType.value = 'create'

    const { done } = onOpen()

    done()
  }

  const onOpenDrawer = async (key: string) => {
    actionType.value = 'update'

    const { done } = onOpen()

    try {
      const res = await localeAPI.read(key)
      setState(res)
    } finally {
      done()
    }
  }

  const onDelete = async (key: string) => {
    const ret = await localeAPI.delete(key)
    if (ret) {
      useAppMessage().success('Operation Success!')
      await onInit()
    }
  }

  const [registerTable, { onInit }] = useTable<
    Pick<AppLocale, '_id' | 'key' | 'createdAt' | 'updatedAt'> & {
      isCompleted: boolean
      process: number
    }
  >({
    localeUniqueKey: 'locale',

    maxHeight: 600,

    actionList: ['create'],

    onAction: ({ type }) => {
      switch (type) {
        case 'create':
          onCreate()
          break

        default:
          break
      }
    },

    rowKey: (row) => row._id,

    apiProps: {
      // Table API Solution 1
      api: localeAPI.list.bind(localeAPI),
      // Table API Solution 2
      // api: (p) => AppAxios.post({ url: '/system/locale/list', data: p }),
    },

    queryFormProps: {
      localeUniqueKey: 'locale',
      localeWithTable: true,
      span: 8,
      labelWidth: 100,
      schemas: [
        {
          type: 'Base:Select',
          formProp: {
            path: 'key',
          },
          componentProp: {
            clearable: true,
            options: ['app:', 'sys:', 'form:', 'table:'].map((i) => ({
              value: i,
              label: i,
            })),
          },
        },
        {
          type: 'Base:Input',
          formProp: {
            path: 'value',
          },
          componentProp: {
            clearable: true,
          },
        },
        {
          type: 'Extend:Query',
        },
      ],
    },

    columns: [
      {
        key: 'key',
        align: 'center',
        width: 400,
        sorter: true,
      },

      {
        key: 'process',
        width: 100,
        align: 'center',
        extendType: 'formatter',
        formatter: (row) => row.process * 100 + '%',
      },

      {
        key: 'isCompleted',
        width: 120,
        align: 'center',
        extendType: 'formatter',
        formatter: (row) => (row.isCompleted ? 'Finished' : 'Unfinished'),
      },

      {
        key: 'createdAt',
        width: 200,
        align: 'center',
        extendType: 'formatter',
        formatter: (row) => formatTime(row.createdAt!),
        sorter: true,
      },

      {
        key: 'updatedAt',
        width: 200,
        align: 'center',
        extendType: 'formatter',
        formatter: (row) => formatTime(row.updatedAt!),
        sorter: true,
      },

      {
        key: 'action',
        align: 'center',
        width: 100,
        extendType: 'action',
        extendActionType: ['read'],
        onRead: (row) => {
          formData.value.oldKey = row.key
          onOpenDrawer(row.key!)
        },
        onDelete: (row) => {
          onDelete(row.key!)
        },
      },
    ],
  })

  const [registerForm, { onOpen }] = useForm<AppLocale>({
    localeUniqueKey: 'locale',

    localeWithTable: true,

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
      onYes: async (apiHandler) => {
        await apiHandler(
          // Form API Solution 1
          localeAPI[actionType.value].bind(localeAPI),
          // Form API Solution 2
          // (data) => AppAxios.put({ url: '/system/locale', data }),
          formData.value
        )
        resetState()
        await onInit()
      },
      onNo: (done) => {
        resetState()
        done()
      },
    },

    // TODO type error
    // @ts-ignore
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
          locale: false,
        },
        componentProp: {
          clearable: true,
          type: 'textarea',
        },
      })),
    ]),
  })
</script>
