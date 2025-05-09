<script lang="ts" setup>
import { langAPI } from '@/api/system/lang'

defineOptions({
  name: 'Lang',
})

// locale unique key
const key = 'lang'
const keyField = '_id'

const [
  register,
  {
    onOpenCreateForm,
    onReadAndOpenUpdateForm,
  },
] = useCRUD<AppSystemLang>({
  baseAPI: langAPI,

  tableProps: {
    localeUniqueKey: key,
    rowKey: row => row[keyField],
    maxHeight: 600,
    striped: true,
    bordered: true,
    singleLine: false,

    headerLeftBuiltInActions: [
      {
        _builtInType: 'create',
        onPresetClick() {
          onOpenCreateForm()
        },
      },
    ],

    auths: {
      list: `system:${key}:list`,
      create: `system:${key}:create`,
      read: `system:${key}:read`,
      update: `system:${key}:update`,
      delete: `system:${key}:delete`,
      deleteMany: `system:${key}:deleteMany`,
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
        width: 80,
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
          // @ts-expect-error fk sort
          multiple: 1,
        },
      },

      {
        ...WTablePresetStatusColumn,
        sorter: {
          // @ts-expect-error fk sort
          multiple: 2,
        },
      },

      {
        ...WTablePresetCreatedAtColumn,
        sorter: {
          // @ts-expect-error fk sort
          multiple: 3,
        },
      },

      {
        ...WTablePresetUpdatedAtColumn,
        sorter: {
          // @ts-expect-error fk sort
          multiple: 4,
        },
      },

      {
        key: 'action',
        width: 100,
        extendType: 'action',
        fixed: 'right',
        actionButtons: [
          {
            _builtInType: 'read',
            // @ts-expect-error do not know why
            async onPresetClick(rowData) {
              await onReadAndOpenUpdateForm(rowData[keyField])
            },
          },
        ],
      },
    ],
  },

  formProps: {
    localeUniqueKey: key,
    localeWithTable: true,
    dialogPreset: 'modal',
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
            valueType: 'boolean',
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
