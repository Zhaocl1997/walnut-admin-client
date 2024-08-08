<script lang="ts">
</script>

<script lang="ts" setup>
import { useLangList } from './useLangList'
import type { WForm } from '@/components/UI/Form'

import { localeAPI } from '@/api/system/locale'

export default defineComponent({
  name: 'Locale',
})

const { langList } = useLangList()
const { currentRoute } = useRouter()

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
    rowKey: row => row._id!,
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
      labelWidth: 90,
      // query form schemas
      schemas: [
        {
          type: 'Base:Select',
          formProp: {
            path: 'key',
          },
          componentProp: {
            clearable: true,
            tag: true,
            filterable: true,
            options: ['app.', 'sys.', 'form.', 'table.', 'dict.'].map(
              i => ({
                value: i,
                label: i,
              }),
            ),
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
        formatter: row => `${(row.process! * 100).toFixed(2)}%`,
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
        actionButtons: [
          {
            _builtInType: 'read',
          },
          {
            _builtInType: 'delete',
          },
        ],
        onActionButtonsClick: async ({ type, rowData }) => {
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

  // @ts-expect-error
  formProps: computed<WForm.Props>(() => ({
    // set the n-drawer display-directive to 'if'
    // the default display-directive for advanced from with modal or drawer is 'show'
    // mostly for performance thought
    // but in this case, the schema is generated dynamically, default form data would generate wrongly
    // this can be fixed by use v-if to control visible
    advancedProps: {
      displayDirective: 'if',
    },

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

      ...langList.value.map<WForm.Schema.Item>(i => ({
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

onActivated(() => {
  const localeKey = currentRoute.value.query?.localeKey as string

  if (localeKey)
    onTableOpenCreateForm({ key: localeKey })
})
</script>

<template>
  <WCRUD @hook="register" />
</template>
