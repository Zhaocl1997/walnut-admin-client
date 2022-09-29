<template>
  <WCRUD @hook="register"></WCRUD>
</template>

<script lang="tsx">
  export default defineComponent({
    name: 'AppMonitorCache',
  })
</script>

<script lang="tsx" setup>
  import { cacheAPI } from '@/api/app/monitor/cache'

  // locale unique key
  const localeKey = 'appCache'
  const authKey = 'cache'

  const { t } = useAppI18n()

  const [
    register,
    { onApiTableReadAndOpenUpdateForm, onApiTableDelete, onApiTableList },
  ] = useCRUD<AppCacheModel>({
    baseAPI: cacheAPI,

    tableProps: {
      localeUniqueKey: localeKey,
      rowKey: (row) => row.key!,
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
            const res = await useAppConfirm(t('app.cache.clear.confirm'))

            if (res) {
              await cacheAPI.clear()
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
          sorter: true,
        },

        {
          key: 'type',
          width: 280,
          extendType: 'dict',
          dictType: 'app_cache_type',
          filter: true,
          useDictNameAsTitle: true,
        },

        {
          key: 'valueBytes',
          width: 140,
          sorter: true,
        },

        {
          key: 'expire',
          width: 100,
          sorter: true,
        },

        {
          key: 'startTime',
          width: 200,
          sorter: true,
        },

        {
          key: 'expireTime',
          width: 200,
          sorter: true,
        },

        {
          key: 'action',
          width: 80,
          extendType: 'action',
          fixed: 'right',
          extendActionType: ['detail', 'delete'],
          onExtendActionType: async ({ type, rowData }) => {
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
              return <w-JSON height="100%" value={formData.value}></w-JSON>
            },
          },
        },
      ],
    },
  })
</script>
