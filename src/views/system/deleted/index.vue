<script lang="ts" setup>
import { deletedAPI, recoverAPI } from '@/api/system/deleted'

defineOptions({
  name: 'Deleted',
})

// locale unique key
const localeKey = 'deleted'
// auth key
const authKey = 'deleted'
const keyField = '_id'

const { t } = useAppI18n()

const [
  register,
  {
    onReadAndOpenUpdateForm,
    onDeleteManyConfirm,
    onApiList,
    onGetApiListParams,
  },
] = useCRUD<AppSystemDeleted>({
  baseAPI: deletedAPI,

  tableProps: {
    localeUniqueKey: localeKey,
    rowKey: row => row[keyField]!,
    maxHeight: 600,
    striped: true,
    bordered: true,
    singleLine: false,

    headerLeftBuiltInActions: [
      {
        _builtInType: 'delete',
        onPresetClick() {
          onDeleteManyConfirm()
        },
      },
    ],

    auths: {
      list: `system:${authKey}:list`,
      read: `system:${authKey}:read`,
      deleteMany: `system:${authKey}:deleteMany`,
    },

    queryFormProps: {
      localeUniqueKey: localeKey,
      localeWithTable: true,
      span: 6,
      showFeedback: false,
      labelWidth: 80,
      yGap: 10,
      // query form schemas
      schemas: [
        {
          type: 'Base:Input',
          formProp: {
            path: 'content',
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
            path: 'modelName',
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
            path: 'collectionName',
          },
          componentProp: {
            clearable: true,
            onKeyupEnter() {
              onApiList()
            },
          },
        },

        {
          type: 'Base:DatePicker',
          formProp: {
            path: 'deletedAt',
          },
          componentProp: {
            type: 'daterange',
            clearable: true,
            format: 'yyyy-MM-dd',
            // TODO valueFormat seem not work in daterange
            valueFormat: 'yyyy-MM-dd',
            onUpdateFormattedValue(v) {
              const queryFormData = onGetApiListParams()
              queryFormData.value.query = Object.assign(queryFormData.value.query!, { deletedAt: v })
            },
          },
        },

        {
          type: 'Extend:Query',
          componentProp: {
            foldable: true,
            defaultFold: true,
            countToFold: 2,
          },
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
        key: 'modelName',
        width: 160,
        sorter: {
          multiple: 1,
          compare: 'default',
        },
      },

      {
        key: 'collectionName',
        width: 160,
        sorter: {
          multiple: 2,
          compare: 'default',
        },
      },

      {
        key: 'deletedAt',
        width: 200,
        sorter: {
          multiple: 6,
          compare: 'default',
        },
        defaultSortOrder: 'descend',
      },

      {
        key: 'action',
        width: 120,
        extendType: 'action',
        fixed: 'right',
        columnBuiltInActions: [
          {
            _builtInType: 'detail',
            async onPresetClick(rowData) {
              await onReadAndOpenUpdateForm(rowData[keyField]!)
            },
          },
        ],
        columnExtraActions: [
          {
            _builtInType: 'recover',
            confirm: true,
            buttonProps: {
              textProp: () => t('table.deleted.recover'),
              type: 'warning',
              size: 'small',
              auth: `system:${authKey}:recover`,
            },
            iconProps: {
              icon: 'mdi:backup-restore',
            },
            async onPresetClick(rowData) {
              await recoverAPI({ _id: rowData._id, deletedId: rowData.deletedId })
              useAppMsgSuccess()
              await onApiList()
            },
          },
        ],
      },
    ],
  },

  formProps: {
    localeUniqueKey: localeKey,
    localeWithTable: true,
    dialogPreset: 'drawer',
    baseRules: true,
    labelWidth: 140,
    xGap: 0,

    descriptionProps: {
      bordered: true,
      column: 2,
      colon: true,
    },

    dialogProps: {
      defaultButton: false,
      width: '40%',
      closable: true,
      autoFocus: false,
    },

    schemas: [
      {
        type: 'Base:Input',
        formProp: {
          path: 'modelName',
        },
        descriptionProp: {
          span: 1,
        },
      },

      {
        type: 'Base:Input',
        formProp: {
          path: 'collectionName',
        },
        descriptionProp: {
          span: 1,
        },
      },

      {
        type: 'Base:Input',
        formProp: {
          path: 'content',
        },
        descriptionProp: {
          span: 1,
        },
      },

      {
        type: 'Base:Input',
        formProp: {
          path: 'deletedBy',
        },
        descriptionProp: {
          span: 1,
        },
      },

      {
        type: 'Base:Input',
        formProp: {
          path: 'deletedAt',
        },
      },
    ],
  },
})
</script>

<template>
  <div>
    <!-- @vue-generic {AppSystemDeleted} -->
    <WCRUD @hook="register" />
  </div>
</template>
