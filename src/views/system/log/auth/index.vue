<script lang="ts" setup>
import { logAuthAPI } from '@/api/system/log'

defineOptions({
  name: 'LogAuth',
})

// locale unique key
const localeKey = 'log.auth'
const authKey = 'log:auth'

const [register, { onApiTableDeleteMany }] = useCRUD<AppSystemLogSignin>({
  baseAPI: logAuthAPI,

  tableProps: {
    localeUniqueKey: localeKey,
    rowKey: row => row._id!,
    maxHeight: 600,
    striped: true,
    bordered: true,
    singleLine: false,

    auths: {
      list: `system:${authKey}:list`,
      deleteMany: `system:${authKey}:deleteMany`,
    },

    headerActions: ['delete'],

    onTableHeaderActions: ({ type }) => {
      switch (type) {
        case 'delete':
          onApiTableDeleteMany()
          break

        default:
          break
      }
    },

    queryFormProps: {
      localeUniqueKey: localeKey,
      localeWithTable: true,
      span: 6,
      showFeedback: false,
      labelWidth: 80,
      yGap: 10,
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
            path: 'ip',
          },
          componentProp: {
            clearable: true,
          },
        },

        {
          type: 'Base:DatePicker',
          formProp: {
            path: 'authTime',
          },
          componentProp: {
            type: 'daterange',
            clearable: true,
            format: 'yyyy-MM-dd',
            valueFormat: 'yyyy-MM-dd',
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
        key: 'userName',
        width: 120,
        sorter: true,
      },

      {
        key: 'success',
        width: 140,
        sorter: true,
        extendType: 'dict',
        dictType: 'sys_shared_success',
        filter: true,
        filterMultiple: false,
      },

      {
        key: 'type',
        width: 160,
        sorter: true,
        extendType: 'dict',
        dictType: 'sys_auth_type',
        filter: true,

        // use dict name as column title
        useDictNameAsTitle: true,
      },

      {
        key: 'ip',
        width: 160,
      },

      {
        key: 'location',
        width: 160,
        extendType: 'formatter',
        formatter: row => row.location || '-',
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
        key: 'msg',
        width: 200,
        ellipsis: {
          tooltip: true,
        },
      },

      {
        key: 'authTime',
        width: 200,
        sorter: true,
        defaultSortOrder: 'descend',
      },
    ],
  },
})
</script>

<template>
  <WCRUD @hook="register" />
</template>
