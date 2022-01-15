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

  // locale unique key
  const key = 'user'

  const [register, { onCreateAndOpen, onReadAndOpen, onDelete, onDeleteMany }] =
    useCRUD<AppUser>({
      baseAPI: userAPI,

      // default value for create form
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
                path: 'username',
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
            key: 'username',
            width: 100,
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
          },

          {
            type: 'Extend:RoleSelect',
            formProp: {
              path: 'role',
            },
            componentProp: {
              multiple: true,
            },
          },
        ],
      },
    })
</script>
