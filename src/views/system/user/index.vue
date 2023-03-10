<script lang="ts">
export default defineComponent({
  name: 'User',
})
</script>

<script lang="ts" setup>
import { userAPI } from '@/api/system/user'

const { t } = useAppI18n()

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
    rowKey: row => row._id!,
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
            path: 'userName',
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
        key: 'userName',
        width: 100,
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
        fixed: 'right',
        actionButtons: [
          {
            _builtInType: 'read',
          },
          {
            _builtInType: 'delete',
            _dropdown: true,
          },
          {
            _builtInType: 'update-pass',
            textProp: () => t('app.base.pass.update'),
            _dropdown: true,
            type: 'info',
            size: 'tiny',
            icon: 'mdi:update',
            auth: 'system:user:pass:update',
          },
          {
            _builtInType: 'reset-pass',
            textProp: () => t('app.base.pass.reset'),
            _dropdown: true,
            type: 'warning',
            size: 'tiny',
            icon: 'mdi:lock-reset',
            auth: 'system:user:pass:reset',
          },
        ],
        onActionButtonsClick: async ({ type, rowData }) => {
          switch (type) {
            case 'read':
              await onApiTableReadAndOpenUpdateForm(rowData._id!)
              break

            case 'delete':
              await onApiTableDelete(rowData._id!)
              break

            case 'update-pass':
              console.log(1)
              break

            case 'reset-pass':
              console.log(2)
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
          path: 'userName',
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

<template>
  <WCRUD @hook="register" />
</template>
