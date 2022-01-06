<template>
  <WCRUD @hook="register"></WCRUD>
</template>

<script lang="ts">
  export default defineComponent({
    name: 'Lang',
  })
</script>

<script lang="ts" setup>
  import { formatTime } from 'easy-fns-ts'

  import { langAPI } from '/@/api/system/lang'

  const [register, { onCreateAndOpen, onReadAndOpen }] = useCRUD<AppLang>({
    baseAPI: langAPI,

    // default value for create form
    defaultFormData: {
      status: true,
      order: 0,
    },

    onBeforeRequest: (data) => {
      if ((data.status! as unknown as number) === 1) {
        data.status = true
      }

      if ((data.status! as unknown as number) === 0) {
        data.status = false
      }

      return data
    },

    tableProps: {
      localeUniqueKey: 'lang',

      rowKey: (row) => row._id!,

      maxHeight: 600,

      striped: true,

      actionList: ['create'],

      onAction: ({ type }) => {
        switch (type) {
          case 'create':
            onCreateAndOpen()
            break

          default:
            break
        }
      },

      queryFormProps: {
        localeUniqueKey: 'lang',
        localeWithTable: true,
        span: 6,
        showFeedback: false,
        // query form schemas
        schemas: [
          {
            type: 'Base:Input',
            formProp: {
              path: 'lang',
            },
            componentProp: {
              clearable: true,
            },
          },

          {
            type: 'Base:Select',
            formProp: {
              path: 'status',
            },
            componentProp: {
              clearable: true,
              options: [
                {
                  value: 1,
                  label: 'Normal',
                },
                {
                  value: 0,
                  label: 'Disabled',
                },
              ],
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
          key: 'lang',
          width: 200,
          align: 'center',
        },

        {
          key: 'description',
          width: 200,
          align: 'center',
        },

        {
          key: 'order',
          width: 80,
          align: 'center',
        },
        {
          key: 'status',
          width: 100,
          align: 'center',
          extendType: 'formatter',
          formatter: (row) => (row.status ? 'Normal' : 'Disabled'),
        },

        {
          key: 'createdAt',
          width: 200,
          extendType: 'formatter',
          formatter: (row) => formatTime(row.createdAt!),
          align: 'center',
        },

        {
          key: 'updatedAt',
          width: 200,
          extendType: 'formatter',
          formatter: (row) => formatTime(row.updatedAt!),
          align: 'center',
        },

        {
          key: 'action',
          width: 120,
          align: 'center',
          extendType: 'action',
          extendActionType: ['read'],
          onRead: (row) => {
            onReadAndOpen(row._id!)
          },
        },
      ],
    },

    formProps: {
      localeUniqueKey: 'lang',
      localeWithTable: true,

      preset: 'drawer',

      labelWidth: 140,

      baseRules: true,

      // create/update form schemas
      schemas: [
        {
          type: 'Base:Input',
          formProp: {
            path: 'lang',
            label: 'Language',
          },
          componentProp: {
            clearable: true,
          },
        },
        {
          type: 'Base:Input',
          formProp: {
            path: 'description',
            label: 'Description',
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
            label: 'Order',
          },
          componentProp: {
            clearable: true,
          },
        },
        {
          type: 'Base:Switch',
          formProp: {
            path: 'status',
            label: 'Role status',
          },
          componentProp: {
            checkedText: 'Enabled',
            uncheckedText: 'Disable',
          },
        },
      ],
    },
  })
</script>
