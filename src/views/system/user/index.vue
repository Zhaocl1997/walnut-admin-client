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

  const [register, { onCreateAndOpen, onReadAndOpen, onDelete, onDeleteMany }] =
    useCRUD<AppUser>({
      baseAPI: userAPI,

      tableProps: {
        localeUniqueKey: key,
        rowKey: (row) => row._id!,
        maxHeight: 600,
        striped: true,
        bordered: true,
        singleLine: false,
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
            type: 'selection',
          },

          {
            key: 'username',
            width: 100,
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
            width: 100,
            extendType: 'action',
            extendActionType: ['read', 'delete'],
            readAuth: 'system:user:read',
            deleteAuth: 'system:user:delete',
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
