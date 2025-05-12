<script lang="ts" setup>
import { dictTypeAPI } from '@/api/system/dict'

defineOptions({
  name: 'Dict',
})

const { t } = useAppI18n()

// locale unique key
const localeKey = 'dictType'
const authKey = 'dict:type'

const [
  register,
  {
    onTableOpenCreateForm,
    onApiTableReadAndOpenUpdateForm,
    onApiTableDelete,
    onGetFormData,
  },
  // @ts-expect-error
] = useCRUD<AppSystemDictType>({
  baseAPI: dictTypeAPI,

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
      span: 6,
      showFeedback: false,
      labelWidth: 80,
      // query form schemas
      schemas: [
        {
          type: 'Base:Input',
          formProp: {
            path: 'name',
          },
          componentProp: {
            clearable: true,
          },
        },

        {
          type: 'Base:Input',
          formProp: {
            path: 'type',
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
        key: 'name',
        width: 120,
        titleHelpMessage: true,
        extendType: 'formatter',
        formatter: row => t(row.name!),
      },

      {
        key: 'type',
        width: 140,
        extendType: 'link',
        onClick: async (p) => {
          await useAppRouterPush({
            name: 'DictDetail',
            params: { id: p._id },
            query: { name: p.name },
          })
        },
        ellipsis: {
          tooltip: true,
        },
      },

      {
        key: 'dictDataCount',
        width: 100,
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
        type: 'Extra:LocaleSelect',
        formProp: {
          path: 'name',
        },
        componentProp: {
          prefix: 'dict.name.',
          presetKey: computed(() => {
            // TODO ts-error
            const formData = onGetFormData() as Ref<AppSystemDictType>

            const type = formData.value.type

            if (type)
              return `dict.name.${type}`

            return 'dict.name.'
          }),
        },
      },

      {
        type: 'Base:Input',
        formProp: {
          path: 'type',
        },
        componentProp: {
          clearable: true,
        },
      },

      {
        type: 'Business:Dict',
        formProp: {
          path: 'status',
        },
        componentProp: {
          dictType: 'sys_shared_status',
          renderType: 'radio',
          defaultValue: true,
          componentProps: {
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
    <WCRUD @hook="register" />
  </div>
</template>

<style lang="scss" scoped>

</style>
