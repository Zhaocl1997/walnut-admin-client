<script lang="ts" setup>
import { resetPassowrd, updatePassowrd, userAPI } from '@/api/system/user'

defineOptions({
  name: 'User',
})

const { t } = useAppI18n()

// locale unique key
const key = 'user'
const keyField = '_id'

const { stateRef: updatePasswordFormData, resetState: resetPasswordFormData } = useState({ userId: null, newPassword: null })

const [registerUpdatePassword, { onOpen }] = useForm<typeof updatePasswordFormData.value>({
  dialogPreset: 'modal',
  baseRules: true,
  labelWidth: 100,
  xGap: 0,

  dialogProps: {
    title: computed(() => t('app.base.pass.update')),
    width: '40%',
    onYes,
    onNo: (done) => {
      resetPasswordFormData()
      done()
    },
  },

  schemas: [
    {
      type: 'Extra:Password',
      formProp: {
        path: 'newPassword',
        label: computed(() => t('app.base.pass.new')),
        first: true,
        rule: [
          {
            key: 'newPassword',
            type: 'string',
            min: 8,
            max: 80,
            required: true,
            message: 'Password is not valid',
          },
        ],
      },
      componentProp: {
        progress: true,
        capslock: true,
      },
    },
  ],
})

const [
  register,
  {
    onOpenCreateForm,
    onReadAndOpenUpdateForm,
    onDeleteConfirm,
    onDeleteManyConfirm,
    onApiList,
  },
] = useCRUD<AppSystemUser>({
  baseAPI: userAPI,

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
      {
        _builtInType: 'delete',
        onPresetClick() {
          onDeleteManyConfirm()
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
      labelWidth: 80,
      schemas: [
        {
          type: 'Base:Input',
          formProp: {
            path: 'userName',
          },
          componentProp: {
            clearable: true,
            onKeyupEnter() {
              onApiList()
            },
          },
        },

        {
          type: 'Base:Input',
          formProp: {
            path: 'nickName',
          },
          componentProp: {
            clearable: true,
            onKeyupEnter() {
              onApiList()
            },
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
        key: 'nickName',
        width: 100,
        extendType: 'formatter',
        formatter(rowData, _rowIndex) {
          return rowData.nickName ?? '-'
        },
      },

      {
        key: 'populated_rolesCount',
        width: 80,
      },

      {
        ...WTablePresetStatusColumn,
        sorter: {
          multiple: 3,
          compare: 'default',
        },
      },

      {
        ...WTablePresetCreatedAtColumn,
        sorter: {
          multiple: 1,
          compare: 'default',
        },
      },

      {
        ...WTablePresetUpdatedAtColumn,
        sorter: {
          multiple: 2,
          compare: 'default',
        },
      },

      {
        key: 'action',
        width: 80,
        extendType: 'action',
        fixed: 'right',
        columnBuiltInActions: [
          {
            _builtInType: 'read',
            async onPresetClick(rowData) {
              await onReadAndOpenUpdateForm(rowData[keyField])
            },
          },
          {
            _builtInType: 'delete',
            _dropdown: true,
            _show: row => row.userName !== AppConstRoles.ADMIN,
            async onPresetClick(rowData) {
              await onDeleteConfirm(rowData[keyField])
            },
          },
        ],
        columnExtraActions: [
          {
            _builtInType: 'updatePass',
            _dropdown: true,
            _show: row => row.userName !== AppConstRoles.ADMIN,
            async onPresetClick(rowData) {
              updatePasswordFormData.value.userId = rowData[keyField]
              onOpen()
            },
            buttonProps: {
              textProp: () => t('app.base.pass.update'),
              type: 'info',
              size: 'small',
              auth: 'system:user:pass:update',
            },
            iconProps: {
              icon: 'mdi:update',
            },
          },
          {
            _builtInType: 'resetPass',
            _dropdown: true,
            _show: row => row.userName !== AppConstRoles.ADMIN,
            async onPresetClick(rowData) {
              const confirm = await useAppConfirm(t('app.base.pass.reset.confirm', { userName: rowData.userName }))

              if (confirm) {
                const res = await resetPassowrd({ userId: rowData[keyField] })

                if (res) {
                  useAppMsgSuccess()
                  await onApiList()
                }
              }
            },
            buttonProps: {
              textProp: () => t('app.base.pass.reset'),
              type: 'warning',
              size: 'small',
              auth: 'system:user:pass:reset',
            },
            iconProps: {
              icon: 'mdi:lock-reset',
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
        type: 'Extend:RoleSelect',
        formProp: {
          path: 'roles',
          labelHelpMessage: true,
        },
        componentProp: {
          multiple: true,
        },
      },
    ],
  },
})

async function onYes(_, done) {
  try {
    await updatePassowrd(updatePasswordFormData.value)
    useAppMsgSuccess()
    resetPasswordFormData()
    await onApiList()
  }
  finally {
    done()
  }
}
</script>

<template>
  <div>
    <WCRUD @hook="register" />

    <WForm :model="updatePasswordFormData" @hook="registerUpdatePassword" />
  </div>
</template>
