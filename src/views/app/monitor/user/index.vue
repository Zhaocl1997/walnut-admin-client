<template>
  <WCRUD @hook="register"></WCRUD>
</template>

<script lang="tsx">
  export default defineComponent({
    name: 'AppMonitorUser',
  })
</script>

<script lang="tsx" setup>
  import { monitorUserAPI } from '@/api/app/monitor/user'

  // locale unique key
  const localeKey = 'app.monitor.user'
  const authKey = 'cache'

  const { t } = useAppI18n()

  const [register] = useCRUD<AppMonitorUserModel>({
    baseAPI: monitorUserAPI,

    tableProps: {
      localeUniqueKey: localeKey,
      rowKey: (row) => row._id!,
      maxHeight: 600,
      striped: true,
      bordered: true,
      singleLine: false,

      auths: {
        list: `app:monitor:${authKey}:list`,
      },

      // clear default header actions
      headerActions: [],

      extraHeaderActions: [],

      queryFormProps: {
        localeUniqueKey: localeKey,
        localeWithTable: true,
        span: 6,
        labelWidth: 80,
        schemas: [
          {
            type: 'Base:Input',
            formProp: {
              path: 'visitorId',
            },
            componentProp: {
              clearable: true,
            },
          },

          {
            type: 'Base:Input',
            formProp: {
              path: 'ip',
            },
            componentProp: {
              clearable: true,
            },
          },

          {
            type: 'Base:Input',
            formProp: {
              path: 'location',
            },
            componentProp: {
              clearable: true,
            },
          },

          {
            type: 'Base:Input',
            formProp: {
              path: 'os',
            },
            componentProp: {
              clearable: true,
            },
          },

          {
            type: 'Base:Input',
            formProp: {
              path: 'browser',
            },
            componentProp: {
              clearable: true,
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
          key: 'index',
          extendType: 'index',
          fixed: 'left',
        },

        {
          key: 'visitorId',
          minWidth: 160,
          ellipsis: {
            tooltip: true,
          },
        },

        {
          key: 'ip',
          width: 160,
        },

        {
          key: 'location',
          width: 160,
          extendType: 'formatter',
          formatter: (row) => row.location || '-',
          ellipsis: {
            tooltip: true,
          },
        },

        {
          key: 'browser',
          width: 160,
          ellipsis: {
            tooltip: true,
          },
        },

        {
          key: 'os',
          width: 160,
          ellipsis: {
            tooltip: true,
          },
        },

        {
          key: 'auth',
          width: 120,
          extendType: 'tag',
          tagProps: (row) => ({
            type: row.auth === true ? 'success' : 'warning',
            size: 'small',
          }),
          formatter: (row) =>
            row.auth === true
              ? t('table.app.monitor.user.auth.true')
              : t('table.app.monitor.user.auth.false'),
          filter: true,
          filterMultiple: false,
          filterOptions: [
            {
              value: 'true',
              label: computed(() => t('table.app.monitor.user.auth.true')),
            },
            {
              value: 'false',
              label: computed(() => t('table.app.monitor.user.auth.false')),
            },
          ],
        },

        {
          key: 'focus',
          width: 160,
          extendType: 'tag',
          tagProps: (row) => ({
            type: row.focus === true ? 'success' : 'info',
            size: 'small',
          }),
          formatter: (row) =>
            row.focus === true
              ? t('table.app.monitor.user.focus.true')
              : t('table.app.monitor.user.focus.false'),
          filter: true,
          filterMultiple: false,
          filterOptions: [
            {
              value: 'true',
              label: computed(() => t('table.app.monitor.user.focus.true')),
            },
            {
              value: 'false',
              label: computed(() => t('table.app.monitor.user.focus.false')),
            },
          ],
        },

        {
          key: 'left',
          width: 120,
          extendType: 'tag',
          tagProps: (row) => ({
            type: row.left === true ? 'error' : 'success',
            size: 'small',
          }),
          formatter: (row) =>
            row.left === true
              ? t('table.app.monitor.user.left.true')
              : t('table.app.monitor.user.left.false'),
          filter: true,
          filterMultiple: false,
          filterOptions: [
            {
              value: 'true',
              label: computed(() => t('table.app.monitor.user.left.true')),
            },
            {
              value: 'false',
              label: computed(() => t('table.app.monitor.user.left.false')),
            },
          ],
        },

        {
          key: 'action',
          width: 80,
          extendType: 'action',
          fixed: 'right',
          extendActionType: [],
          extendActionButtons: [
            {
              iconButton: true,
              icon: 'ant-design:logout-outlined',
              type: 'error',
              textProp: () => t('app.monitor.user.forceLogout'),
              confirm: true,
              show: (row) => {
                return row.auth === true
              },
              onClick: () => {
                console.log(123)
              },
            },
          ],
          // onExtendActionType: async ({ type, rowData }) => {
          // switch (type) {
          //   case 'detail':
          //     await onApiTableReadAndOpenUpdateForm(rowData.key!)
          //     break
          //   case 'delete':
          //     await onApiTableDelete(rowData.key!)
          //     break
          //   default:
          //     break
          // }
          // },
        },
      ],
    },
  })
</script>