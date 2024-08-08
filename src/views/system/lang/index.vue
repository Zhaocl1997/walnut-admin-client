<script lang="ts" setup>
import { langAPI } from '@/api/system/lang'

defineOptions({
  name: 'Lang',
})

// locale unique key
const key = 'lang'

const [
  register,
  {
    onTableOpenCreateForm,
    onApiTableReadAndOpenUpdateForm,
    onApiTableDelete,
  },
] = useCRUD<AppSystemLang>({
  baseAPI: langAPI,

  tableProps: {
    localeUniqueKey: key,
    rowKey: row => row._id!,
    maxHeight: 600,
    striped: true,
    bordered: true,
    singleLine: false,
    headerActions: ['create'],

    auths: {
      list: `system:${key}:list`,
      create: `system:${key}:create`,
      read: `system:${key}:read`,
      update: `system:${key}:update`,
      delete: `system:${key}:delete`,
      deleteMany: `system:${key}:deleteMany`,
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
      localeUniqueKey: key,
      localeWithTable: true,
      span: 6,
      showFeedback: false,
      labelWidth: 80,
      // query form schemas
      schemas: [
        {
          type: 'Base:Input',
          formProp: {
            path: 'lang',
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

    // table columns
    columns: [
      {
        key: 'index',
        extendType: 'index',
        fixed: 'left',
      },

      {
        key: 'lang',
        width: 200,
        fixed: 'left',
      },

      {
        key: 'description',
        width: 200,
      },

      {
        ...WTablePresetOrderColumn,
        sorter: {
          multiple: 1,
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
    localeUniqueKey: key,
    localeWithTable: true,
    preset: 'modal',
    baseRules: true,
    labelWidth: 80,
    xGap: 0,
    // create/update form schemas
    schemas: [
      {
        type: 'Base:Input',
        formProp: {
          path: 'lang',
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
          type: 'textarea',
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
    ],
  },
})
</script>

<template>
  <WCRUD @hook="register" />
</template>
