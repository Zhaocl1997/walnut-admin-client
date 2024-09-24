<script lang="ts" setup>
import { forceQuit, monitorUserAPI } from '@/api/app/monitor/user'

defineOptions({
  name: 'AppMonitorUser',
})

// locale unique key
const localeKey = 'app.monitor.user'
const authKey = 'user'

const { t } = useAppI18n()

const [register, { onApiTableList, onApiTableReadAndOpenUpdateForm }] = useCRUD<AppMonitorUserModel>({
  baseAPI: monitorUserAPI,

  tableProps: {
    localeUniqueKey: localeKey,
    rowKey: row => row._id!,
    maxHeight: 600,
    striped: true,
    bordered: true,
    singleLine: false,

    polling: 5000,

    auths: {
      read: `app:monitor:${authKey}:read`,
    },

    // clear default header actions
    headerActions: [],

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
            path: 'city',
            label: computed(() => t('app.base.location')),
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
        formatter: row => row.city || '-',
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
        tagProps: row => ({
          type: row.auth === true ? 'success' : 'warning',
          size: 'small',
        }),
        formatter: row =>
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
        tagProps: row => ({
          type: row.focus === true ? 'success' : 'info',
          size: 'small',
        }),
        formatter: row =>
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
        tagProps: row => ({
          type: row.left === true ? 'error' : 'success',
          size: 'small',
        }),
        formatter: row =>
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
        actionButtons: [
          {
            _builtInType: 'detail',
          },
          {
            _builtInType: 'force-quit',
            icon: 'ant-design:logout-outlined',
            type: 'error',
            iconButton: true,
            textProp: () => t('app.monitor.user.forceLogout'),
            // TODO table action inside => `ButtonConfirm`
            confirm: true,
            auth: 'app:monitor:user:forceQuit',
            _show: row => !row.left && row.auth,
          },
        ],
        onActionButtonsClick: async ({ type, rowData }) => {
          if (type === 'detail')
            await onApiTableReadAndOpenUpdateForm(rowData._id!)

          if (type === 'force-quit') {
            await forceQuit(rowData._id!)
            useAppMsgSuccess()
            await onApiTableList()
          }
        },
      },
    ],
  },

  formProps: {
    localeUniqueKey: localeKey,
    localeWithTable: true,
    preset: 'drawer',
    labelWidth: 140,
    xGap: 0,

    useDescription: true,
    descriptionProps: {
      bordered: true,
      column: 2,
      labelPlacement: 'left',
      labelStyle: {
        width: '100px',
      },
    },

    advancedProps: {
      defaultButton: false,
      width: '40%',
      closable: true,
      autoFocus: false,
    },

    schemas: [
      {
        type: 'Base:Input',
        formProp: {
          path: 'visitorId',
        },
        descriptionProp: {
          span: 2,
        },
      },
      {
        type: 'Base:Input',
        formProp: {
          path: 'userId',
        },
        descriptionProp: {
          span: 2,
        },
      },
      {
        type: 'Base:Input',
        formProp: {
          path: 'userName',
        },
        descriptionProp: {
          span: 2,
        },
      },
      {
        type: 'Base:Input',
        formProp: {
          path: 'os',
        },
        descriptionProp: {
          span: 2,
        },
      },
      {
        type: 'Base:Input',
        formProp: {
          path: 'browser',
        },
        descriptionProp: {
          span: 2,
        },
      },
      {
        type: 'Base:Input',
        formProp: {
          path: 'ip',
        },
        descriptionProp: {
          span: 2,
        },
      },
      {
        type: 'Base:Input',
        formProp: {
          path: 'isp',
        },
        descriptionProp: {
          span: 2,
        },
      },
      {
        type: 'Base:Input',
        formProp: {
          path: 'currentRouter',
        },
        descriptionProp: {
          span: 2,
        },
      },
      {
        type: 'Base:Input',
        formProp: {
          path: 'country',
        },
        descriptionProp: {
          show: false,
        },
      },
      {
        type: 'Base:Input',
        formProp: {
          path: 'province',
        },
        descriptionProp: {
          show: false,
        },
      },
      {
        type: 'Base:Input',
        formProp: {
          path: 'city',
        },
        descriptionProp: {
          show: false,
        },
      },
      {
        type: 'Base:Input',
        formProp: {
          path: 'area',
        },
        descriptionProp: {
          show: false,
        },
      },
      {
        type: 'Base:Input',
        formProp: {
          path: 'location',
        },
        descriptionProp: {
          span: 2,
          formatter: (_, row) => {
            return `${row?.country}/${row?.province}/${row?.city}/${row?.area}`
          },
        },
      },
      {
        type: 'Base:Input',
        formProp: {
          path: 'sr',
        },
        descriptionProp: {
          span: 2,
        },
      },
      {
        type: 'Base:Input',
        formProp: {
          path: 'vp',
        },
        descriptionProp: {
          span: 2,
        },
      },
      {
        type: 'Base:Input',
        formProp: {
          path: 'firstVisitAt',
          label: computed(() => t('table.app.monitor.user.firstVisitAt')),
        },
        descriptionProp: {
          span: 2,
        },
      },
      {
        type: 'Base:Input',
        formProp: {
          path: 'lastActiveAt',
          label: computed(() => t('table.app.monitor.user.lastActiveAt')),
        },
        descriptionProp: {
          span: 2,
        },
      },
    ],
  },
})
</script>

<template>
  <WCRUD @hook="register" />
</template>
