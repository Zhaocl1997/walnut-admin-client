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
    { onCreateAndOpen, onReadAndOpen, onDelete, onDeleteMany, onGetFormData },
  ] = useCRUD<AppLocale>({
    baseAPI: localeAPI,

    // default value for create form
    defaultFormData: {},

    onBeforeRequest: (data) => {
      return data
    },

    tableProps: {
      localeUniqueKey: key,
      rowKey: (row) => row._id!,
      maxHeight: 600,
      striped: true,
      actionList: ['create', 'delete'],

      onAction: ({ type }) => {
        switch (type) {
          case 'create':
            onCreateAndOpen()
            break

          case 'delete':
            onDeleteMany()
            break

          default:
            break
        }
      },

      queryFormProps: {
        localeUniqueKey: key,
        localeWithTable: true,
        span: 8,
        showFeedback: false,
        labelWidth: 100,
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
          type: 'selection',
        },

        {
          key: 'key',
          width: 400,
          sorter: true,
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
          width: 180,
          extendType: 'action',
          extendActionType: ['read', 'delete'],
          onRead: (row) => {
            const formData = onGetFormData()

            // @ts-ignore
            formData.value.oldKey = row.key

            onReadAndOpen(row.key!)
          },
          onDelete: (row) => {
            onDelete(row.key!)
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
