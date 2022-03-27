<template>
  <WCRUD @hook="register"></WCRUD>
</template>

<script lang="ts">
  export default defineComponent({
    name: 'LogOperate',
  })
</script>

<script lang="ts" setup>
  import { formatTime } from 'easy-fns-ts'
  import { logOperateAPI } from '/@/api/system/log'

  // locale unique key
  const key = 'log:operate'

  const [
    register,
    {
      onApiTableReadAndOpenUpdateForm,
      onApiTableDeleteMany,
      // TODO ts-error
      onGetApiTableListParams,
    },
  ] = useCRUD<AppSystemLogOperate>({
    baseAPI: logOperateAPI,

    tableProps: {
      localeUniqueKey: key,
      rowKey: (row) => row._id!,
      maxHeight: 600,
      striped: true,
      bordered: true,
      singleLine: false,

      auths: {
        list: `system:${key}:list`,
        read: `system:${key}:read`,
        delete: `system:${key}:delete`,
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
        localeUniqueKey: key,
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
              // TODO internalShow not trigger rerender
              //   defaultFold: true,
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
          width: 120,
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
          filterOptions: ['GET', 'POST', 'PUT', 'DELETE'].map((i) => ({
            value: i,
            label: i,
          })),
          filterOptionValues: computed(() => {
            const listParams = onGetApiTableListParams()
            return listParams.value.query.method ?? []
          }),
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
          key: 'statusCode',
          width: 100,
          sorter: true,
        },

        {
          key: 'operatedAt',
          width: 200,
          extendType: 'formatter',
          formatter: (row) => formatTime(row.operatedAt!),
          sorter: true,
          defaultSortOrder: 'descend',
        },

        {
          key: 'action',
          width: 60,
          extendType: 'action',
          extendActionType: ['detail'],
          onExtendActionType: async ({ type, rowData }) => {
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
      localeUniqueKey: key,
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
            path: 'ip',
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
            path: 'statusCode',
          },
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
          descriptionProp: {
            formatter: (time) => formatTime(time),
          },
        },
      ],
    },
  })
</script>
