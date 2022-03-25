<template>
  <div>
    <n-card>
      <n-page-header :title="$route.query.name" @back="onBack"></n-page-header>
    </n-card>
    <WCRUD @hook="register"></WCRUD>
  </div>
</template>

<script lang="ts">
  export default defineComponent({
    name: 'DictDetail',
  })
</script>

<script lang="ts" setup>
  import { dictDataAPI } from '/@/api/system/dict'
  import { getLocaleMessageStartsWith } from '/@/locales/utils'

  const { t } = useAppI18n()
  const { currentRoute } = useAppRouter()

  // locale unique key
  const key = 'dictData'

  const onBack = () => {
    useRouterPush({ name: 'Dict', replace: true })
  }

  const dictDataLabelOptions = getLocaleMessageStartsWith('dict:')

  const [
    register,
    {
      onTableCreateAndOpenDetail,
      onApiTableReadAndOpenDetail,
      onApiTableDelete,
    },
  ] = useCRUD<AppSystemDictData>({
    baseAPI: dictDataAPI,

    tableProps: {
      localeUniqueKey: key,
      rowKey: (row) => row._id!,
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
            onTableCreateAndOpenDetail()
            break

          default:
            break
        }
      },

      queryFormProps: {
        localeUniqueKey: key,
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
          width: 120,
          extendType: 'formatter',
          formatter: (row) => t(row.label!),
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
          onExtendActionType: async ({ type, rowData }) => {
            switch (type) {
              case 'read':
                await onApiTableReadAndOpenDetail(rowData._id!)
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
          type: 'Base:Select',
          formProp: {
            path: 'label',
          },
          componentProp: {
            clearable: true,
            filterable: true,
            options: dictDataLabelOptions,
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
          type: 'Base:Switch',
          formProp: {
            path: 'status',
          },
          componentProp: {
            defaultValue: true,
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

<style lang="scss" scoped></style>
