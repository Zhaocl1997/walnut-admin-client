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

  // locale unique key
  const key = 'lang'

  const [register, { onCreateAndOpen, onReadAndOpen, onDelete }] =
    useCRUD<AppLang>({
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
        localeUniqueKey: key,
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
          localeUniqueKey: key,
          localeWithTable: true,
          span: 6,
          showFeedback: false,
          labelWidth: 80,
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
            sorter: {
              multiple: 1,
            },
          },

          {
            key: 'status',
            width: 100,
            align: 'center',
            extendType: 'formatter',
            formatter: (row) => (row.status ? 'Normal' : 'Disabled'),
            sorter: {
              multiple: 2,
            },
          },

          {
            key: 'createdAt',
            width: 200,
            extendType: 'formatter',
            formatter: (row) => formatTime(row.createdAt!),
            align: 'center',
            sorter: {
              multiple: 3,
            },
          },

          {
            key: 'updatedAt',
            width: 200,
            extendType: 'formatter',
            formatter: (row) => formatTime(row.updatedAt!),
            align: 'center',
            sorter: {
              multiple: 4,
            },
          },

          {
            key: 'action',
            width: 240,
            align: 'center',
            extendType: 'action',
            extendActionType: ['read', 'delete'],
            onRead: (row) => {
              onReadAndOpen(row._id!)
            },
            onDelete: (row) => {
              onDelete(row._id!)
            },
          },
        ],
      },

      formProps: {
        localeUniqueKey: key,
        localeWithTable: true,
        preset: 'modal',
        baseRules: true,
        labelWidth: 80,
        xGap: 0,
        // create/update form schemas
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
            type: 'Base:Input',
            formProp: {
              path: 'description',
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
            },
            componentProp: {
              clearable: true,
            },
          },
          {
            type: 'Base:Switch',
            formProp: {
              path: 'status',
            },
          },
        ],
      },
    })
</script>
