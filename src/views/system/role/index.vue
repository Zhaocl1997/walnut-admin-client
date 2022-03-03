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

  import MenuTree from './MenuTree.vue'

  // locale unique key
  const key = 'role'

  const [
    register,
    { onCreateAndOpen, onReadAndOpen, onDelete, onDeleteMany, onGetActionType },
  ] = useCRUD<AppRole>({
    baseAPI: roleAPI,

    tableProps: {
      localeUniqueKey: key,
      rowKey: (row) => row._id!,
      maxHeight: 600,
      striped: true,
      bordered: true,
      singleLine: false,
      actionList: ['create', 'delete'],

      auths: {
        list: `system:${key}:list`,
        create: `system:${key}:create`,
        read: `system:${key}:read`,
        update: `system:${key}:update`,
        delete: `system:${key}:delete`,
        deleteMany: `system:${key}:deleteMany`,
      },

      onAction: ({ type }) => {
        switch (type) {
          case 'create':
            onCreateAndOpen()
            break

          case 'delete':
            onDeleteMany()
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
          type: 'selection',
          fixed: 'left',
        },

        {
          key: 'index',
          extendType: 'index',
          fixed: 'left',
          width: 80,
        },

        {
          key: 'roleName',
          width: 200,
          sorter: {
            multiple: 4,
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
          filter: true,
          filterMultiple: false,
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
          extendActionType: ['read', 'delete'],
          onRead: (row) => {
            onReadAndOpen(row._id!)
          },
          onDelete: (row) => {
            onDelete(row._id!)
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
          type: 'Base:Render',
          formProp: {
            path: 'menus',
            rule: false,
            labelHelpMessage: true,
          },
          componentProp: {
            render: ({ formData }) => (
              <MenuTree
                v-model={[formData.menus, 'value']}
                checkable
                disabled={formData.roleName === 'admin'}
              />
            ),
          },
        },
      ],
    },
  })
</script>
