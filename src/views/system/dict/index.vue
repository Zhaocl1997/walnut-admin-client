<template>
  <WCRUD @hook="register"></WCRUD>
</template>

<script lang="ts">
  export default defineComponent({
    name: 'Dict',
  })
</script>

<script lang="ts" setup>
  import { dictTypeAPI } from '/@/api/system/dict'

  const { t } = useAppI18n()

  // locale unique key
  const key = 'dictType'

  const [
    register,
    {
      onTableOpenCreateForm,
      onApiTableReadAndOpenUpdateForm,
      onApiTableDelete,
    },
  ] = useCRUD<AppSystemDictType>({
    baseAPI: dictTypeAPI,

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
          formatter: (row) => t(row.name!),
        },

        {
          key: 'type',
          width: 140,
          extendType: 'link',
          onClick: (p) => {
            // TODO simple encode
            useAppRouterPush({
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
          width: 80,
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
      labelWidth: 100,
      xGap: 0,
      // create/update form schemas
      schemas: [
        {
          type: 'Extend:Locale',
          formProp: {
            path: 'name',
          },
          componentProp: {
            prefix: 'dict:name:',
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

<style lang="scss" scoped></style>
