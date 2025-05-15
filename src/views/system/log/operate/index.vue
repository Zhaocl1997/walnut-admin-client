<script lang="ts" setup>
import { logOperateAPI } from '@/api/system/log'

defineOptions({
  name: 'LogOperate',
})

// locale unique key
const localeKey = 'log.operate'
// auth key
const authKey = 'log:operate'
const keyField = '_id'

const [
  register,
  {
    onReadAndOpenUpdateForm,
    onDeleteManyConfirm,
    onApiList,
    onGetApiListParams,
  },
] = useCRUD<AppSystemLogOperate>({
  baseAPI: logOperateAPI,

  tableProps: {
    localeUniqueKey: localeKey,
    rowKey: row => row[keyField],
    maxHeight: 600,
    striped: true,
    bordered: true,
    singleLine: false,

    headerLeftBuiltInActions: [
      {
        _builtInType: 'delete',
        onPresetClick() {
          onDeleteManyConfirm()
        },
      },
    ],

    auths: {
      list: `system:${authKey}:list`,
      read: `system:${authKey}:read`,
      deleteMany: `system:${authKey}:deleteMany`,
    },

    queryFormProps: {
      localeUniqueKey: localeKey,
      localeWithTable: true,
      span: 6,
      showFeedback: false,
      labelWidth: 80,
      yGap: 10,
      // query form schemas
      schemas: [
        {
          type: 'Base:Input',
          formProp: {
            path: 'title',
          },
          componentProp: {
            clearable: true,
            onKeyupEnter() {
              onApiList()
            },
          },
        },

        {
          type: 'Base:Input',
          formProp: {
            path: 'userName',
          },
          componentProp: {
            clearable: true,
            onKeyupEnter() {
              onApiList()
            },
          },
        },

        {
          type: 'Base:Input',
          formProp: {
            path: 'ip',
          },
          componentProp: {
            clearable: true,
            onKeyupEnter() {
              onApiList()
            },
          },
        },

        {
          type: 'Base:DatePicker',
          formProp: {
            path: 'operatedAt',
          },
          componentProp: {
            type: 'daterange',
            clearable: true,
            format: 'yyyy-MM-dd',
            // TODO valueFormat seem not work in daterange
            valueFormat: 'yyyy-MM-dd',
            onUpdateFormattedValue(v) {
              const queryFormData = onGetApiListParams()
              queryFormData.value.query = Object.assign(queryFormData.value.query!, { operatedAt: v })
            },
          },
        },

        {
          type: 'Extend:Query',
          componentProp: {
            foldable: true,
            defaultFold: true,
            countToFold: 2,
          },
        },
      ],
    },

    // table columns
    columns: [
      {
        key: 'selection',
        type: 'selection',
        fixed: 'left',
      },

      {
        key: 'index',
        extendType: 'index',
        fixed: 'left',
      },

      {
        key: 'title',
        width: 100,
        sorter: {
          multiple: 1,
          compare: 'default',
        },
      },

      {
        key: 'actionType',
        width: 140,
        extendType: 'dict',
        dictType: 'sys_operate_type',
        sorter: {
          multiple: 2,
          compare: 'default',
        },
        filter: true,
      },

      {
        key: 'method',
        width: 120,
        sorter: {
          multiple: 3,
          compare: 'default',
        },
        filter: true,
        filterOptions: ['GET', 'POST', 'PUT', 'DELETE'].map(i => ({
          value: i,
          label: i,
        })),
      },

      {
        key: 'userName',
        width: 120,
        sorter: {
          multiple: 4,
          compare: 'default',
        },
      },

      {
        key: 'ip',
        width: 120,
      },

      {
        key: 'success',
        width: 120,
        sorter: {
          multiple: 5,
          compare: 'default',
        },
        extendType: 'dict',
        dictType: 'sys_shared_success',
        filter: true,
        filterMultiple: false,
      },

      {
        key: 'operatedAt',
        width: 200,
        sorter: {
          multiple: 6,
          compare: 'default',
        },
        defaultSortOrder: 'descend',
      },

      {
        key: 'action',
        width: 80,
        extendType: 'action',
        fixed: 'right',
        columnBuiltInActions: [
          {
            _builtInType: 'detail',
            async onPresetClick(rowData) {
              await onReadAndOpenUpdateForm(rowData[keyField]!)
            },
          },
        ],
      },
    ],
  },

  formProps: {
    localeUniqueKey: localeKey,
    localeWithTable: true,
    dialogPreset: 'drawer',
    baseRules: true,
    labelWidth: 140,
    xGap: 0,

    descriptionProps: {
      bordered: true,
      column: 2,
      colon: true,
    },

    dialogProps: {
      defaultButton: false,
      width: '40%',
      closable: true,
      autoFocus: false,
    },

    schemas: [
      {
        type: 'Base:Input',
        formProp: {
          path: 'title',
        },
        descriptionProp: {
          span: 1,
        },
      },

      {
        type: 'business:Dict',
        formProp: {
          path: 'actionType',
        },
        descriptionProp: {
          span: 1,
          type: 'dict',
          typeProps: {
            dictType: 'sys_operate_type',
          },
        },
      },

      {
        type: 'Base:Input',
        formProp: {
          path: 'method',
        },
        descriptionProp: {
          span: 1,
        },
      },

      {
        type: 'Base:Input',
        formProp: {
          path: 'userName',
        },
        descriptionProp: {
          span: 1,
        },
      },

      {
        type: 'Base:Input',
        formProp: {
          path: 'success',
        },
        descriptionProp: {
          span: 1,
          type: 'dict',
          typeProps: {
            dictType: 'sys_shared_success',
          },
        },
      },

      {
        type: 'Base:Input',
        formProp: {
          path: 'statusCode',
        },
      },

      {
        type: 'Base:Input',
        formProp: {
          path: 'url',
        },
      },

      {
        type: 'Base:Input',
        formProp: {
          path: 'os',
        },
      },

      {
        type: 'Base:Input',
        formProp: {
          path: 'ip',
        },
      },

      {
        type: 'Base:Input',
        formProp: {
          path: 'location',
        },
      },

      {
        type: 'Base:Input',
        formProp: {
          path: 'browser',
        },
      },

      {
        type: 'Base:Input',
        formProp: {
          path: 'invokingMethod',
        },
      },

      {
        type: 'Base:Input',
        formProp: {
          path: 'correspondingMS',
        },
        descriptionProp: { formatter: ms => `${ms} ms` },
      },

      {
        type: 'Base:Input',
        formProp: {
          path: 'requestData',
        },
        descriptionProp: {
          type: 'json',
          typeProps: {
            height: '200px',
          },
        },
      },

      {
        type: 'Base:Input',
        formProp: {
          path: 'responseData',
        },
        descriptionProp: {
          type: 'json',
          typeProps: {
            height: '200px',
          },
        },
      },

      {
        type: 'Base:Input',
        formProp: {
          path: 'operatedAt',
        },
      },
    ],
  },
})
</script>

<template>
  <div>
    <!-- @vue-generic {AppSystemLogOperate} -->
    <WCRUD @hook="register" />
  </div>
</template>
