<template>
  <WCRUD @hook="register"></WCRUD>
</template>

<script lang="ts">
  export default defineComponent({
    name: 'Locale',
  })
</script>

<script lang="ts" setup>
  import type { WForm } from '/@/components/UI/Form'

  import { localeAPI } from '/@/api/system/locale'

  import { useLangList } from './useLangList'

  const { langList } = useLangList()

  // locale unique key
  const key = 'locale'

  const [
    register,
    {
      onTableOpenCreateForm,
      onApiTableReadAndOpenUpdateForm,
      onApiTableDelete,
      onApiTableDeleteMany,
      onGetFormData,
    },
  ] = useCRUD<AppSystemLocale & { oldKey?: string }>({
    baseAPI: localeAPI,

    tableProps: {
      localeUniqueKey: key,
      rowKey: (row) => row._id!,
      maxHeight: 600,
      striped: true,
      bordered: true,
      singleLine: false,

      auths: {
        list: `system:${key}:list`,
        create: `system:${key}:create`,
        read: `system:${key}:read`,
        update: `system:${key}:update`,
        delete: `system:${key}:delete`,
        deleteMany: `system:${key}:deleteMany`,
      },

      onTableHeaderActions: ({ type }) => {
        switch (type) {
          case 'create':
            onTableOpenCreateForm()
            break

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
        // query form schemas
        schemas: [
          {
            type: 'Base:Select',
            formProp: {
              path: 'key',
            },
            componentProp: {
              clearable: true,
              options: ['app:', 'sys:', 'form:', 'table:'].map((i) => ({
                value: i,
                label: i,
              })),
            },
          },

          {
            type: 'Base:Input',
            formProp: {
              path: 'value',
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
          key: 'key',
          width: 300,
          sorter: true,
          fixed: 'left',
        },

        {
          key: 'process',
          width: 100,
          extendType: 'formatter',
          formatter: (row) => (row.process! * 100).toFixed(2) + '%',
        },

        {
          ...WTablePresetCreatedAtColumn,
          sorter: true,
        },

        {
          ...WTablePresetUpdatedAtColumn,
          sorter: true,
        },

        {
          key: 'action',
          width: 80,
          extendType: 'action',
          fixed: 'right',
          onExtendActionType: async ({ type, rowData }) => {
            switch (type) {
              case 'read':
                {
                  const formData = onGetFormData()

                  formData.value.oldKey = rowData.key

                  await onApiTableReadAndOpenUpdateForm(rowData.key!)
                }
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

    // @ts-ignore
    formProps: computed(() => ({
      localeUniqueKey: key,
      localeWithTable: true,
      preset: 'drawer',
      baseRules: true,
      labelWidth: 100,
      xGap: 0,
      // create/update form schemas
      schemas: computed<WForm.Schema.Item[]>(() => [
        {
          type: 'Base:Input',
          formProp: {
            path: 'key',
          },
          componentProp: {
            clearable: true,
          },
        },

        ...langList.value.map<WForm.Schema.Item>((i) => ({
          type: 'Base:Input',
          formProp: {
            path: i.value as string,
            label: i.label,
            locale: false,
            rule: false,
          },
          componentProp: {
            clearable: true,
            type: 'textarea',
          },
        })),
      ]),
    })),
  })
</script>
