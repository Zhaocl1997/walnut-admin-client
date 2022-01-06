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

  // ref
  const actionType = ref<ActionType>('')
  const { langList } = useLangList()

  // state
  const {
    stateRef: formData,
    setState: setFormData,
    resetState: resetFormData,
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
      setFormData(res)
    } finally {
      done()
    }
  }

  // table
  const [registerTable, { onInit, onDelete, onDeleteMany }] =
    useTable<AppLocale>({
      localeUniqueKey: 'locale',

      rowKey: (row) => row._id!,

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

      apiProps: {
        // Table API Solution 1
        listApi: localeAPI.list.bind(localeAPI),
        // Table API Solution 2
        // api: (p) => AppAxios.post({ url: '/system/locale/list', data: p }),

        deleteApi: localeAPI.delete.bind(localeAPI),

        deleteManyApi: localeAPI.deleteMany.bind(localeAPI),
      },

      queryFormProps: {
        localeUniqueKey: 'locale',
        localeWithTable: true,
        span: 6,
        showFeedback: false,
        // query form schemas
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
          formatter: (row) => (row.process! * 100).toFixed(2) + '%',
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

  // form
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
        resetFormData()
        await onInit()
      },
      onNo: (done) => {
        resetFormData()
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
