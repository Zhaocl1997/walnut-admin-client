<template>
  <WCRUD @hook="register"></WCRUD>
</template>

<script lang="ts">
  export default defineComponent({
    name: 'User',
  })
</script>

<script lang="ts" setup>
  import { formatTime } from 'easy-fns-ts'

  import { userAPI } from '/@/api/system/user'

  const [register, { onCreateAndOpen, onReadAndOpen, onDelete, onDeleteMany }] =
    useCRUD<AppUser>({
      baseAPI: userAPI,

      defaultFormData: {
        status: true,
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
                path: 'username',
                label: 'User Name',
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
            type: 'selection',
          },

          {
            title: 'User Name',
            key: 'username',
            width: 100,
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
              path: 'username',
              label: 'User Name',
            },
            componentProp: {
              clearable: true,
            },
          },

          {
            type: 'Base:Switch',
            formProp: {
              path: 'status',
              label: 'Status',
            },
          },

          {
            type: 'Base:Input',
            formProp: {
              path: 'role',
              label: 'Role',
            },
          },
        ],
      },
    })
</script>
