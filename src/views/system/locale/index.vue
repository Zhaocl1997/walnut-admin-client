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

  import { useInitialState } from '/@/utils'

  import { useLangList } from './useLangList'

  // main
  const actionType = ref<'create' | 'update'>('create')
  const { AppSuccess } = useAppMsgSuccess()
  const { langList } = useLangList()

  const {
    stateRef: formData,
    setState,
    resetState,
  } = useInitialState<AppLocale & { oldKey?: string }>({
    key: '',
    oldKey: '',
  })

  const onCreateAndOpen = () => {
    actionType.value = 'create'

    const { done } = onOpen()

    done()
  }

  const onReadAndOpen = async (key: string) => {
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
      AppSuccess()
      await onInit()
    }
  }

  const [registerTable, { onInit, onDeleteMany }] = useTable<
    Pick<AppLocale, '_id' | 'key' | 'createdAt' | 'updatedAt'> & {
      values: string[]
    }
  >({
    localeUniqueKey: 'locale',

    maxHeight: 600,

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

    rowKey: (row) => row._id,

    apiProps: {
      // Table API Solution 1
      listApi: localeAPI.list.bind(localeAPI),
      // Table API Solution 2
      // api: (p) => AppAxios.post({ url: '/system/locale/list', data: p }),

      deleteManyApi: localeAPI.deleteMany.bind(localeAPI),
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
        type: 'selection',
      },

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
        formatter: (row) =>
          (
            (row.values.filter((i) => i).length / langList.value.length) *
            100
          ).toFixed(2) + '%',
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
        width: 180,
        extendType: 'action',
        extendActionType: ['read', 'delete'],
        onRead: (row) => {
          formData.value.oldKey = row.key
          onReadAndOpen(row.key!)
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

    labelWidth: 140,

    baseRules: true,

    advancedProps: {
      actionType,
      width: 500,
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
          rule: false,
        },
        componentProp: {
          clearable: true,
          type: 'textarea',
        },
      })),
    ]),
  })
</script>
