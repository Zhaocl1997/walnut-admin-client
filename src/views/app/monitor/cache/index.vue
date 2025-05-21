<script lang="tsx" setup>
import { monitorCacheAPI } from '@/api/app/monitor/cache'

defineOptions({
  name: 'AppMonitorCache',
})

// locale unique key
const localeKey = 'appCache'
const authKey = 'cache'

const { t } = useAppI18n()

const [
  register,
  { onApiTableReadAndOpenUpdateForm, onApiTableDelete, onApiTableList },
] = useCRUD<AppMonitorCacheModel>({
  baseAPI: monitorCacheAPI,

  tableProps: {
    localeUniqueKey: localeKey,
    rowKey: row => row.key!,
    maxHeight: 600,
    striped: true,
    bordered: true,
    singleLine: false,

    auths: {
      list: `app:monitor:${authKey}:list`,
      read: `app:monitor:${authKey}:read`,
      delete: `app:monitor:${authKey}:delete`,
    },

    // clear default header actions
    headerActions: [],

    extraHeaderActions: [
      {
        textProp: () => t('app.cache.clear'),
        type: 'error',
        icon: 'ant-design:delete-outlined',
        onClick: async () => {
          const { confirmed } = await useAppConfirm(t('app.cache.clear.confirm'))

          if (confirmed) {
            await monitorCacheAPI.clear()
            useAppMsgSuccess()
            await onApiTableList()
          }
        },
      },
    ],

    queryFormProps: {
      localeUniqueKey: localeKey,
      localeWithTable: true,
      span: 6,
      showFeedback: false,
      labelWidth: 80,
      schemas: [
        {
          type: 'Base:Input',
          formProp: {
            path: 'key',
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
        key: 'key',
        minWidth: 250,
        sorter: {
          multiple: 1,
          compare: 'default',
        },
      },

      {
        key: 'type',
        width: 250,
        extendType: 'dict',
        dictType: 'app_cache_type',
        filter: true,
        useDictNameAsTitle: true,
      },

      {
        key: 'valueBytes',
        width: 140,
        sorter: {
          multiple: 2,
          compare: 'default',
        },
      },

      {
        key: 'expire',
        width: 100,
        sorter: {
          multiple: 3,
          compare: 'default',
        },
      },

      {
        key: 'startTime',
        width: 200,
        sorter: {
          multiple: 4,
          compare: 'default',
        },
      },

      {
        key: 'expireTime',
        width: 200,
        sorter: {
          multiple: 5,
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
            _builtInType: 'detail',
          },
          {
            _builtInType: 'delete',
          },
        ],
        onActionButtonsClick: async ({ type, rowData }) => {
          switch (type) {
            case 'detail':
              await onApiTableReadAndOpenUpdateForm(rowData.key!)
              break

            case 'delete':
              await onApiTableDelete(rowData.key!)
              break

            default:
              break
          }
        },
      },
    ],
  },

  formProps: {
    localeUniqueKey: localeKey,
    localeWithTable: true,
    preset: 'drawer',
    labelWidth: 0,
    xGap: 0,

    advancedProps: {
      defaultButton: false,
      width: '40%',
      closable: true,
      autoFocus: false,
      detailTitle: true,
    },

    schemas: [
      {
        type: 'Base:Render',
        formProp: {
          path: 'data',
          showLabel: false,
        },
        componentProp: {
          render({ formData }) {
            return <WJSON height="100%" value={formData.value}></WJSON>
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
