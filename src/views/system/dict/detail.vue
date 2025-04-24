<script lang="ts" setup>
import { dictDataAPI } from '@/api/system/dict'

defineOptions({
  name: 'DictDetail',
})

const { t } = useAppI18n()
const { currentRoute } = useAppRouter()

// locale unique key
const localeKey = 'dictData'
const authKey = 'dict:data'

async function onBack() {
  await useAppRouterPush({ name: 'Dict', replace: true })
}

const title = computed(
  () =>
    (currentRoute.value.query?.name
      && t(currentRoute.value.query.name as string)) as string,
)

const getLocalePrefix = computed(() => `dict.${(currentRoute.value.query?.name as string)?.split('.').slice(-1)}.`)

const [
  register,
  {
    onTableOpenCreateForm,
    onApiTableReadAndOpenUpdateForm,
    onApiTableDelete,
    onGetFormData,
  },
  // @ts-expect-error
] = useCRUD<AppSystemDictData>({
  baseAPI: dictDataAPI,

  tableProps: {
    localeUniqueKey: localeKey,
    rowKey: row => row._id!,
    maxHeight: 600,
    striped: true,
    bordered: true,
    singleLine: false,
    headerActions: ['create'],

    auths: {
      list: `system:${authKey}:list`,
      create: `system:${authKey}:create`,
      read: `system:${authKey}:read`,
      update: `system:${authKey}:update`,
      delete: `system:${authKey}:delete`,
      deleteMany: `system:${authKey}:deleteMany`,
    },

    onTableHeaderActions: ({ type }) => {
      switch (type) {
        case 'create':
          onTableOpenCreateForm()
          break

        default:
          break
      }
    },

    queryFormProps: {
      localeUniqueKey: localeKey,
      localeWithTable: true,
      span: 8,
      showFeedback: false,
      labelWidth: 100,
      // query form schemas
      schemas: [
        {
          type: 'Base:Input',
          formProp: {
            path: 'typeId',
          },
          componentProp: {
            defaultValue: currentRoute.value.params.id as string,
          },
          extraProp: {
            vIf: false,
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
          type: 'Base:Input',
          formProp: {
            path: 'description',
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
        key: 'index',
        extendType: 'index',
        fixed: 'left',
      },

      {
        key: 'label',
        width: 240,
        extendType: 'formatter',
        formatter: row => t(row.label!),
        ellipsis: {
          tooltip: true,
        },
      },

      {
        key: 'value',
        width: 120,
      },

      {
        ...WTablePresetOrderColumn,
        sorter: {
          multiple: 1,
        },
      },

      {
        key: 'tagType',
        width: 140,
        extendType: 'dict',
        dictType: 'sys_type',
        filter: true,
      },

      {
        key: 'description',
        width: 200,
        ellipsis: {
          tooltip: true,
        },
      },

      {
        ...WTablePresetStatusColumn,
        sorter: {
          multiple: 2,
        },
      },

      {
        ...WTablePresetCreatedAtColumn,
        sorter: {
          multiple: 3,
        },
      },

      {
        ...WTablePresetUpdatedAtColumn,
        sorter: {
          multiple: 4,
        },
      },

      {
        key: 'action',
        width: 80,
        extendType: 'action',
        fixed: 'right',
        actionButtons: [
          {
            _builtInType: 'read',
          },
          {
            _builtInType: 'delete',
          },
        ],
        onActionButtonsClick: async ({ type, rowData }) => {
          switch (type) {
            case 'read':
              await onApiTableReadAndOpenUpdateForm(rowData._id!)
              break

            case 'delete':
              await onApiTableDelete(rowData._id!)
              break

            default:
              break
          }
        },
      },
    ],
  },

  formProps: {
    localeUniqueKey: localeKey,
    localeWithTable: true,
    preset: 'modal',
    baseRules: true,
    labelWidth: 100,
    xGap: 0,

    // create/update form schemas
    schemas: [
      {
        type: 'Base:Input',
        formProp: {
          path: 'typeId',
        },
        componentProp: {
          clearable: true,
          defaultValue: currentRoute.value.params.id as string,
        },
        extraProp: {
          vShow: false,
        },
      },

      {
        type: 'Extra:LocaleSelect',
        formProp: {
          path: 'label',
        },
        componentProp: {
          prefix: getLocalePrefix,
          presetKey: computed(() => {
            // TODO ts-error
            const formData = onGetFormData() as Ref<AppSystemDictData>

            const val = formData.value.value

            const key = (currentRoute.value.query.name as string)?.split('.')[2]

            if (val)
              return `dict.${key}.${val}`

            return `dict.${key}.`
          }),
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
        // TODO
        type: 'Base:Select',
        formProp: {
          path: 'tagType',
        },
        componentProp: {
          clearable: true,
          options: [
            {
              value: 'primary',
              label: 'primary',
            },
            {
              value: 'info',
              label: 'info',
            },
            {
              value: 'success',
              label: 'success',
            },
            {
              value: 'warning',
              label: 'warning',
            },
            {
              value: 'error',
              label: 'error',
            },
          ],
        },
      },

      {
        type: 'Base:InputNumber',
        formProp: {
          path: 'order',
        },
        componentProp: {
          clearable: true,
          defaultValue: 0,
        },
      },

      {
        type: 'Extend:Dict',
        formProp: {
          path: 'status',
        },
        componentProp: {
          dictType: 'sys_shared_status',
          dictRenderType: 'radio',
          defaultValue: true,
          renderComponentProps: {
            button: true,
          },
        },
      },

      {
        type: 'Base:Input',
        formProp: {
          path: 'description',
          rule: false,
        },
        componentProp: {
          clearable: true,
          type: 'textarea',
        },
      },
    ],
  },
})
</script>

<template>
  <div>
    <n-card>
      <n-page-header :title="title" @back="onBack" />
    </n-card>
    <WCRUD @hook="register" />
  </div>
</template>

<style lang="scss" scoped>

</style>
