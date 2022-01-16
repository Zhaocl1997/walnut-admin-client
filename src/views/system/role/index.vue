<template>
  <WCRUD @hook="register"></WCRUD>
</template>

<script lang="tsx">
  export default defineComponent({
    name: 'Role',
  })
</script>

<script lang="tsx" setup>
  import { formatTime } from 'easy-fns-ts'

  import { roleAPI } from '/@/api/system/role'

  import MenuTree from './MenuTree.vue'

  // locale unique key
  const key = 'role'

  const [
    register,
    { onCreateAndOpen, onReadAndOpen, onDelete, onDeleteMany, onGetActionType },
  ] = useCRUD<AppRole>({
    baseAPI: roleAPI,

    // default value for create form
    defaultFormData: {
      status: true,
      menus: [],
    },

    onBeforeRequest: (data) => {
      if ((data.status! as unknown as number) === 1) {
        data.status = true
      }

      if ((data.status! as unknown as number) === 0) {
        data.status = false
      }

      return data
    },

    tableProps: {
      localeUniqueKey: key,
      rowKey: (row) => row._id!,
      maxHeight: 600,
      striped: true,
      actionList: ['create', 'delete'],

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
        span: 8,
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
            type: 'Base:Select',
            formProp: {
              path: 'status',
            },
            componentProp: {
              clearable: true,
              options: [
                {
                  value: 1,
                  label: 'Normal',
                },
                {
                  value: 0,
                  label: 'Disabled',
                },
              ],
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
        },

        {
          key: 'roleName',
          width: 200,
          align: 'center',
          sorter: {
            multiple: 4,
          },
        },

        {
          key: 'description',
          width: 200,
          align: 'center',
        },

        {
          key: 'order',
          width: 100,
          align: 'center',
          sorter: {
            multiple: 2,
          },
        },

        {
          key: 'usersCount',
          width: 120,
          align: 'center',
        },

        {
          key: 'status',
          width: 100,
          align: 'center',
          extendType: 'formatter',
          formatter: (row) => (row.status ? 'Normal' : 'Disabled'),
          sorter: {
            multiple: 3,
          },
        },

        {
          key: 'createdAt',
          width: 200,
          extendType: 'formatter',
          formatter: (row) => formatTime(row.createdAt!),
          align: 'center',
          sorter: {
            multiple: 1,
          },
        },

        {
          key: 'updatedAt',
          width: 200,
          extendType: 'formatter',
          formatter: (row) => formatTime(row.updatedAt!),
          align: 'center',
        },

        {
          key: 'action',
          align: 'center',
          width: 240,
          extendType: 'action',
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
            disabled: computed(
              (): boolean => onGetActionType().value === 'update'
            ),
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
          },
        },
        {
          type: 'Base:Switch',
          formProp: {
            path: 'status',
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
