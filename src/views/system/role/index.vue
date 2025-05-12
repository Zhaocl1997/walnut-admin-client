<script lang="ts" setup>
import { roleAPI } from '@/api/system/role'
import { useMenuTree } from './useMenuTree'

defineOptions({
  name: 'Role',
})

// locale unique key
const key = 'role'
const keyField = '_id'

const { getLeftMenu } = useMenuTree()

const [
  register,
  {
    onOpenCreateForm,
    onReadAndOpenUpdateForm,
    // TODO why ts not work
    onGetActionType,
    onGetFormData,
  },
] = useCRUD<AppSystemRole>({
  baseAPI: roleAPI,

  strictFormData: true,

  tableProps: {
    localeUniqueKey: key,
    rowKey: row => row[keyField],
    maxHeight: 600,
    striped: true,
    bordered: true,
    singleLine: false,

    headerLeftBuiltInActions: [
      {
        _builtInType: 'create',
        onPresetClick() {
          onOpenCreateForm()
        },
      },
    ],

    auths: {
      list: `system:${key}:list`,
      create: `system:${key}:create`,
      read: `system:${key}:read`,
      update: `system:${key}:update`,
      delete: `system:${key}:delete`,
      deleteMany: `system:${key}:deleteMany`,
    },

    queryFormProps: {
      localeUniqueKey: key,
      localeWithTable: true,
      span: 6,
      showFeedback: false,
      labelWidth: 100,
      // query form schemas
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
        key: 'index',
        extendType: 'index',
        fixed: 'left',
      },

      {
        key: 'roleName',
        width: 200,
        sorter: {
          // @ts-expect-error fk sort
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
        key: 'populated_usersCount',
        width: 120,
      },

      {
        ...WTablePresetOrderColumn,
        sorter: {
          // @ts-expect-error fk sort
          multiple: 4,
        },
      },

      {
        ...WTablePresetStatusColumn,
        sorter: {
          // @ts-expect-error fk sort
          multiple: 3,
        },
      },

      {
        ...WTablePresetCreatedAtColumn,
        sorter: {
          // @ts-expect-error fk sort
          multiple: 2,
        },
      },

      {
        ...WTablePresetUpdatedAtColumn,
        sorter: {
          // @ts-expect-error fk sort
          multiple: 1,
        },
      },

      {
        key: 'action',
        width: 160,
        extendType: 'action',
        fixed: 'right',
        actionButtons: [
          {
            _builtInType: 'read',
            async onPresetClick(rowData) {
              await onReadAndOpenUpdateForm(rowData[keyField])
            },
          },
        ],
      },
    ],
  },

  formProps: {
    localeUniqueKey: key,
    localeWithTable: true,
    dialogPreset: 'drawer',
    baseRules: true,
    labelWidth: 140,
    xGap: 0,
    // create/update form schemas
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
        type: 'Business:Dict',
        formProp: {
          path: 'status',
        },
        componentProp: {
          dictType: 'sys_shared_status',
          renderType: 'radio',
          defaultValue: true,
          componentProps: {
            button: true,
            valueType: 'boolean',
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
          maxHeight: '600px',
          defaultValue: [],

          treeProps: {
            // @ts-expect-error tree data
            data: getLeftMenu,
            blockLine: true,
            blockNode: true,
            keyField: '_id',
            labelField: 'title',
            disabled: computed(() => {
              const formData = onGetFormData()
              const roleName = formData.value.roleName
              return roleName === AppConstRoles.ADMIN
            }),
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
  <div>
    <!-- @vue-generic {AppSystemRole} -->
    <WCRUD @hook="register" />
  </div>
</template>
