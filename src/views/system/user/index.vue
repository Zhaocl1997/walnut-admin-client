<template>
  <WCRUD @hook="register"></WCRUD>
</template>

<script lang="ts">
  export default defineComponent({
    name: 'User',
  })
</script>

<script lang="ts" setup>
  import { userAPI } from '/@/api/system/user'

  // locale unique key
  const key = 'user'

  const [
    register,
    {
      onTableOpenCreateForm,
      onApiTableReadAndOpenUpdateForm,
      onApiTableDelete,
      onApiTableDeleteMany,
    },
  ] = useCRUD<AppSystemUser>({
    baseAPI: userAPI,

    tableProps: {
      localeUniqueKey: key,
      rowKey: (row) => row._id!,
      maxHeight: 600,
      striped: true,
      bordered: true,
      singleLine: false,

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
        schemas: [
          {
            type: 'Base:Input',
            formProp: {
              path: 'username',
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
          key: 'username',
          width: 'auto',
        },

        {
          ...WTablePresetStatusColumn,
          sorter: {
            multiple: 3,
          },
          filter: true,
          filterMultiple: false,
        },

        {
          ...WTablePresetCreatedAtColumn,
          sorter: {
            multiple: 1,
          },
        },

        {
          ...WTablePresetUpdatedAtColumn,
        },

        {
          key: 'action',
          width: 80,
          extendType: 'action',
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
      preset: 'drawer',
      baseRules: true,
      labelWidth: 140,
      xGap: 0,

      schemas: [
        {
          type: 'Base:Input',
          formProp: {
            path: 'username',
          },
          componentProp: {
            clearable: true,
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
          type: 'Extend:RoleSelect',
          formProp: {
            path: 'role',
            labelHelpMessage: true,
          },
          componentProp: {
            multiple: true,
          },
        },
      ],
    },
  })
</script>
