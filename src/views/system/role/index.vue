<template>
  <WCRUD @hook="register"></WCRUD>
</template>

<script lang="tsx">
  export default defineComponent({
    name: 'Role',
  })
</script>

<script lang="tsx" setup>
  import { roleAPI } from '/@/api/system/role'

  import { useMenuTree } from './useMenuTree'

  // locale unique key
  const key = 'role'

  const { getLeftMenu } = useMenuTree()

  const [
    register,
    {
      onTableOpenCreateForm,
      onApiTableReadAndOpenUpdateForm,
      onApiTableDelete,
      onApiTableDeleteMany,
      // TODO ts-error
      onGetActionType,
      // TODO ts-error
      onGetFormData,
    },
  ] = useCRUD<AppSystemRole>({
    baseAPI: roleAPI,

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
        labelWidth: 100,
        schemas: [
          {
            type: 'Base:Input',
            formProp: {
              path: 'roleName',
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
          key: 'roleName',
          width: 200,
          sorter: {
            multiple: 5,
          },
        },

        {
          key: 'description',
          width: 200,
          ellipsis: {
            tooltip: true,
          },
        },

        {
          key: 'usersCount',
          width: 120,
        },

        {
          ...WTablePresetOrderColumn,
          sorter: {
            multiple: 4,
          },
        },

        {
          ...WTablePresetStatusColumn,
          sorter: {
            multiple: 3,
          },
        },

        {
          ...WTablePresetCreatedAtColumn,
          sorter: {
            multiple: 2,
          },
        },

        {
          ...WTablePresetUpdatedAtColumn,
          sorter: {
            multiple: 1,
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
      preset: 'drawer',
      baseRules: true,
      labelWidth: 140,
      xGap: 0,

      schemas: [
        {
          type: 'Base:Input',
          formProp: {
            path: 'roleName',
            labelHelpMessage: true,
          },
          componentProp: {
            clearable: true,
            disabled: computed(() => onGetActionType().value === 'update'),
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
          type: 'Base:Switch',
          formProp: {
            path: 'status',
          },
          componentProp: {
            defaultValue: true,
          },
        },
        {
          type: 'Base:Tree',
          formProp: {
            path: 'menus',
            rule: false,
            labelHelpMessage: true,
          },
          componentProp: {
            presetPrefixIcon: true,
            toolbar: true,
            multiple: true,
            maxHeight: '400px',

            treeProps: {
              data: getLeftMenu,
              blockLine: true,
              blockNode: true,
              keyField: '_id',
              labelField: 'title',
              disabled: computed(
                () => onGetFormData().value.roleName === 'admin'
              ),

              renderLabel: ({ option }) =>
                option.type === MenuTypeConst.ELEMENT
                  ? (option.permission as string)
                  : (option.title as string),
            },
          },
        },
      ],
    },
  })
</script>
