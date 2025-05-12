<script lang="ts" setup>
import { resetPassowrd, updatePassowrd, userAPI } from '@/api/system/user'

defineOptions({
  name: 'User',
})

const { t } = useAppI18n()

// locale unique key
const key = 'user'
const keyField = '_id'

const { stateRef: updatePasswordFormData, resetState: resetPasswordFormData } = useState({ userId: '', newPassword: '' })

const [registerPassword, { onOpen }] = useForm({
  dialogPreset: 'modal',
  baseRules: true,
  labelWidth: 100,
  xGap: 0,

  dialogProps: {
    title: computed(() => t('app.base.pass.update')),
    width: '40%',
    onYes: async (_, done) => {
      try {
        // TODO
        // refresh request got problem, need to have a deep look
        await updatePassowrd({ userId: updatePasswordFormData.value.userId!, newPassword: updatePasswordFormData.value.newPassword! })

        useAppMsgSuccess()
      }
      finally {
        done()
      }
    },
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
          // @ts-expect-error fk sort
          multiple: 3,
        },
      },

      {
        ...WTablePresetCreatedAtColumn,
        sorter: {
          // @ts-expect-error fk sort
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
            async onPresetClick(rowData) {
              await onReadAndOpenUpdateForm(rowData[keyField])
            },
          },
          {
            _builtInType: 'delete',
            _dropdown: true,
            async onPresetClick(rowData) {
              await onDeleteConfirm(rowData[keyField])
            },
          },
          {
            _builtInType: 'update-pass',
            _dropdown: true,
            _show: row => row.userName !== AppConstRoles.ADMIN,
            buttonProps: {
              textProp: () => t('app.base.pass.update'),
              type: 'info',
              size: 'tiny',
              auth: 'system:user:pass:update',
            },
            iconProps: {
              icon: 'mdi:update',
            },
          },
          // {
          //   _builtInType: 'reset-pass',
          //   textProp: () => t('app.base.pass.reset'),
          //   _dropdown: true,
          //   type: 'warning',
          //   size: 'tiny',
          //   icon: 'mdi:lock-reset',
          //   auth: 'system:user:pass:reset',
          //   _show: row => row.userName !== AppConstRoles.ADMIN,
          // },
        ],
        // onActionButtonsClick: async ({ type, rowData }) => {
        //   switch (type) {
        //     case 'read':
        //       await onReadAndOpenUpdateForm(rowData._id!)
        //       break

        //     case 'delete':
        //       await onDeleteConfirm(rowData._id!)
        //       break

        //     case 'update-pass':
        //       updatePasswordFormData.value.userId = rowData._id
        //       onOpen()
        //       break

        //     case 'reset-pass':
        //       {
        //         const confirm = await useAppConfirm(t('app.base.pass.reset.confirm', { userName: rowData.userName }))

        //         if (confirm) {
        //           const res = await resetPassowrd({ userId: rowData._id! })

        //           if (res)
        //             useAppMsgSuccess()
        //         }
        //       }
        //       break

        //     default:
        //       break
        //   }
        // },
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
</script>

<template>
  <div>
    <WCRUD @hook="register" />

    <WForm :model="updatePasswordFormData" @hook="registerPassword" />
  </div>
</template>
