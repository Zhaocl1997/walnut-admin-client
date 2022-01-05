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

  const [register, { onCreateAndOpen, onReadAndOpen, onDelete, onDeleteMany }] =
    useCRUD<AppRole>({
      baseAPI: roleAPI,

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
          // localeUniqueKey: 'locale',
          // localeWithTable: true,
          span: 8,
          labelWidth: 100,
          schemas: [
            {
              type: 'Base:Input',
              formProp: {
                path: 'roleName',
                label: 'Role Name',
              },
              componentProp: {
                clearable: true,
              },
            },

            {
              type: 'Base:Select',
              formProp: {
                path: 'status',
                label: 'Status',
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

        columns: [
          {
            type: 'selection',
          },

          {
            title: 'Role Name',
            key: 'roleName',
            width: 200,
            align: 'center',
            sorter: {
              multiple: 4,
            },
          },

          {
            title: 'Description',
            key: 'description',
            width: 200,
            align: 'center',
          },

          {
            title: 'Order',
            key: 'order',
            width: 100,
            align: 'center',
            sorter: {
              multiple: 2,
            },
          },

          {
            title: 'Users Count',
            key: 'usersCount',
            width: 120,
            align: 'center',
          },

          {
            title: 'Status',
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
            title: 'Created At',
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
            title: 'Updated At',
            key: 'updatedAt',
            width: 200,
            extendType: 'formatter',
            formatter: (row) => formatTime(row.updatedAt!),
            align: 'center',
          },

          {
            title: 'Action',
            key: 'action',
            align: 'center',
            width: 180,
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
        // localeUniqueKey: 'locale',

        // localeWithTable: true,

        preset: 'drawer',

        labelWidth: 140,

        baseRules: true,

        schemas: [
          {
            type: 'Base:Input',
            formProp: {
              path: 'roleName',
              label: 'Role Name',
            },
            componentProp: {
              clearable: true,
            },
          },
          {
            type: 'Base:Input',
            formProp: {
              path: 'description',
              label: 'Description',
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
              label: 'Order',
            },
            componentProp: {
              clearable: true,
            },
          },
          {
            type: 'Base:Switch',
            formProp: {
              path: 'status',
              label: 'Role status',
            },
            componentProp: {
              checkedText: 'Enabled',
              uncheckedText: 'Disable',
            },
          },
          {
            type: 'Base:Render',
            formProp: {
              path: 'menus',
              label: 'Permission',
              rule: false,
            },
            componentProp: {
              render: ({ formData }) => (
                <MenuTree v-model={[formData.menus, 'value']} checkable />
              ),
            },
          },
        ],
      },
    })
</script>
