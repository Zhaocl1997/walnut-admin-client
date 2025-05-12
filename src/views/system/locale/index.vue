<script lang="ts" setup>
import type { WForm } from '@/components/UI/Form'
import { localeAPI } from '@/api/system/locale'
import { useLangList } from './useLangList'

defineOptions({
  name: 'Locale',
})

const { langList } = useLangList()
const localeKey = useRouterQuery('localeKey')

// locale unique key
const key = 'locale'
const keyField = '_id'

const [
  register,
  {
    onOpenCreateForm,
    onReadAndOpenUpdateForm,
    onDeleteConfirm,
    onDeleteManyConfirm,
    onGetFormData,
  },
] = useCRUD<AppSystemLocale & { oldKey?: string }>({
  baseAPI: localeAPI,

  tableProps: {
    localeUniqueKey: key,
    rowKey: row => row[keyField]!,
    maxHeight: 600,
    striped: true,
    bordered: true,
    singleLine: false,

    headerLeftBuiltInActions: [
      {
        _builtInType: 'create',
        onPresetClick() {
          onOpenCreateForm()
        },
      },
      {
        _builtInType: 'delete',
        onPresetClick() {
          onDeleteManyConfirm()
        },
      },
    ],

    auths: {
      list: `system:${key}:list`,
      create: `system:${key}:create`,
      read: `system:${key}:read`,
      update: `system:${key}:update`,
      delete: `system:${key}:delete`,
      deleteMany: `system:${key}:deleteMany`,
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
        // @ts-expect-error fk sort
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
        // @ts-expect-error fk sort
        sorter: true,
      },

      {
        ...WTablePresetUpdatedAtColumn,
        // @ts-expect-error fk sort
        sorter: true,
      },

      {
        key: 'action',
        width: 160,
        extendType: 'action',
        fixed: 'right',
        actionButtons: [
          {
            _builtInType: 'read',
            async onPresetClick(rowData) {
              const formData = onGetFormData()
              formData.value = Object.assign(formData.value, { oldKey: rowData.key })
              await onReadAndOpenUpdateForm(rowData[keyField])
            },
          },
          {
            _builtInType: 'delete',
            async onPresetClick(rowData) {
              await onDeleteConfirm(rowData[keyField])
            },
          },
        ],
      },
    ],
  },

  formProps: {
    localeUniqueKey: key,
    localeWithTable: true,
    dialogPreset: 'modal',
    baseRules: true,
    labelWidth: 100,
    xGap: 0,
    // @ts-expect-error create/update form schemas
    schemas: computed<WForm.Schema.Item[]>(() => [
      {
        type: 'Base:Input',
        formProp: {
          path: 'key',
        },
        componentProp: {
          clearable: true,
          defaultValue: localeKey.value,
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
  },
})

onMounted(() => {
  if (localeKey.value) {
    onOpenCreateForm(false)
  }
})
</script>

<template>
  <div>
    <!-- @vue-generic {AppSystemLocale} -->
    <WCRUD @hook="register" />
  </div>
</template>
