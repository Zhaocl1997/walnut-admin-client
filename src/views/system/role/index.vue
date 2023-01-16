<script lang="tsx">
export default defineComponent({
  name: 'Role',
})
</script>

<script lang="tsx" setup>
import { useMenuTree } from './useMenuTree'
import { roleAPI } from '@/api/system/role'

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
    onGetActionType,
    onGetFormData,
  },
] = useCRUD<AppSystemRole>({
  baseAPI: roleAPI,

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
          disabled: computed(
            (): boolean => onGetActionType().value === 'update',
          ) as unknown as boolean,
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
              () => {
                // TODO ts-error
                const formData = onGetFormData() as Ref<AppSystemRole>

                const roleName = formData.value.roleName

                return roleName === AppConstRoles.ADMIN
              },
            ),

            renderLabel: ({ option }) =>
              option.type === AppConstMenuType.ELEMENT
                ? (option.permission as string)
                : (option.title as string),
          },
        },
      },
    ],
  },
})
</script>

<template>
  <WCRUD @hook="register" />
</template>
