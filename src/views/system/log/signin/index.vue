<template>
  <WCRUD @hook="register"></WCRUD>
</template>

<script lang="ts">
  export default defineComponent({
    name: 'LogSignin',
  })
</script>

<script lang="ts" setup>
  import { logSigninAPI } from '@/api/system/log'

  // locale unique key
  const key = 'log.signin'

  const [register, { onApiTableDeleteMany }] = useCRUD<AppSystemLogSignin>({
    baseAPI: logSigninAPI,

    tableProps: {
      localeUniqueKey: key,
      rowKey: (row) => row._id!,
      maxHeight: 600,
      striped: true,
      bordered: true,
      singleLine: false,

      auths: {
        list: `system:${key}:list`,
        deleteMany: `system:${key}:deleteMany`,
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
        localeUniqueKey: key,
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
              path: 'signinAt',
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
              // TODO internalShow not trigger rerender
              //   defaultFold: true,
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
          width: 100,
          sorter: true,
        },

        {
          key: 'ip',
          width: 120,
        },

        {
          key: 'location',
          width: 120,
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
          key: 'msg',
          width: 200,
          ellipsis: {
            tooltip: true,
          },
        },

        {
          key: 'success',
          width: 120,
          sorter: true,
          extendType: 'dict',
          dictType: 'sys_shared_success',
          filter: true,
          filterMultiple: false,
        },

        {
          key: 'signinAt',
          width: 200,
          sorter: true,
          defaultSortOrder: 'descend',
        },
      ],
    },
  })
</script>
