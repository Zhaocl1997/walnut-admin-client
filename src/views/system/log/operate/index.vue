<script lang="ts" setup>
import { logOperateAPI } from '@/api/system/log'

defineOptions({
  name: 'LogOperate',
})

const localeKey = 'log.operate'
const authKey = 'log:operate'

const [
  register,
  {
    onApiTableReadAndOpenUpdateForm,
    onApiTableDeleteMany,
    onGetApiTableListParams,
  },
] = useCRUD<AppSystemLogOperate>({
  baseAPI: logOperateAPI,

  tableProps: {
    localeUniqueKey: localeKey,
    rowKey: row => row._id!,
    maxHeight: 600,
    striped: true,
    bordered: true,
    singleLine: false,

    auths: {
      list: `system:${authKey}:list`,
      read: `system:${authKey}:read`,
      deleteMany: `system:${authKey}:deleteMany`,
    },

    headerActions: ['delete'],

    onTableHeaderActions: ({ type }) => {
      switch (type) {
        case 'delete':
          onApiTableDeleteMany()
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
      yGap: 10,
      schemas: [
        {
          type: 'Base:Input',
          formProp: {
            path: 'title',
          },
          componentProp: {
            clearable: true,
          },
        },

        {
          type: 'Base:Input',
          formProp: {
            path: 'userName',
          },
          componentProp: {
            clearable: true,
          },
        },

        {
          type: 'Base:Input',
          formProp: {
            path: 'ip',
          },
          componentProp: {
            clearable: true,
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
            valueFormat: 'yyyy-MM-dd',
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
        sorter: true,
      },

      {
        key: 'actionType',
        width: 140,
        extendType: 'dict',
        dictType: 'sys_operate_type',
        sorter: true,
        filter: true,
      },

      {
        key: 'method',
        width: 120,
        sorter: true,
        filter: true,
        filterOptions: ['GET', 'POST', 'PUT', 'DELETE'].map(i => ({
          value: i,
          label: i,
        })),
        filterOptionValues: computed((): string[] => {
          const listParams = onGetApiTableListParams()

          return listParams.value.query?.method
            ? [listParams.value.query?.method]
            : []
        }) as unknown as string[],
      },

      {
        key: 'userName',
        width: 120,
        sorter: true,
      },

      {
        key: 'ip',
        width: 120,
      },

      {
        key: 'success',
        width: 120,
        sorter: true,
        extendType: 'dict',
        dictType: 'sys_shared_success',
        filter: true,
        filterMultiple: false,
      },

      {
        key: 'operatedAt',
        width: 200,
        sorter: true,
        defaultSortOrder: 'descend',
      },

      {
        key: 'action',
        width: 80,
        extendType: 'action',
        fixed: 'right',
        actionButtons: [
          {
            _builtInType: 'detail',
          },
        ],
        onActionButtonsClick: async ({ type, rowData }) => {
          switch (type) {
            case 'detail':
              await onApiTableReadAndOpenUpdateForm(rowData._id!)
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
    preset: 'drawer',
    baseRules: true,
    labelWidth: 140,
    xGap: 0,

    useDescription: true,
    descriptionProps: {
      bordered: true,
      column: 2,
      colon: true,
      labelPlacement: 'left',
    },

    advancedProps: {
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
        type: 'Base:Input',
        formProp: {
          path: 'actionType',
        },
        descriptionProp: {
          span: 1,
          type: 'dict',
          dictType: 'sys_operate_type',
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
          dictType: 'sys_shared_success',
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
        },
      },

      {
        type: 'Base:Input',
        formProp: {
          path: 'responseData',
        },
        descriptionProp: {
          type: 'json',
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
    <WCRUD @hook="register" />
  </div>
</template>
