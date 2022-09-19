<template>
  <WCRUD @hook="register"></WCRUD>
</template>

<script lang="ts">
  export default defineComponent({
    name: 'AppSetting',
  })
</script>

<script lang="ts" setup>
  import { appSettingAPI } from '@/api/app/setting'

  const { t } = useAppI18n()

  // locale unique key
  const localeKey = 'appSetting'
  const authKey = 'app:setting'

  const [
    register,
    { onTableOpenCreateForm, onApiTableReadAndOpenUpdateForm, onGetActionType },
  ] = useCRUD<AppSettingsModel>({
    baseAPI: appSettingAPI,

    tableProps: {
      localeUniqueKey: localeKey,
      rowKey: (row) => row._id!,
      maxHeight: 600,
      striped: true,
      bordered: true,
      singleLine: false,
      headerActions: ['create'],

      auths: {
        list: `${authKey}:list`,
        create: `${authKey}:create`,
        read: `${authKey}:read`,
        update: `${authKey}:update`,
      },

      onTableHeaderActions: ({ type }) => {
        switch (type) {
          case 'create':
            onTableOpenCreateForm()
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
        // query form schemas
        schemas: [
          {
            type: 'Base:Input',
            formProp: {
              path: 'settingName',
            },
            componentProp: {
              clearable: true,
            },
          },

          {
            type: 'Base:Input',
            formProp: {
              path: 'settingKey',
            },
            componentProp: {
              clearable: true,
            },
          },

          {
            type: 'Base:Input',
            formProp: {
              path: 'settingValue',
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

      columns: [
        {
          key: 'index',
          extendType: 'index',
          fixed: 'left',
        },

        {
          key: 'settingName',
          width: 240,
        },

        {
          key: 'settingKey',
          width: 240,
        },

        {
          key: 'settingValue',
          width: 120,
          ellipsis: {
            tooltip: true,
          },
        },

        {
          key: 'remark',
          width: 200,
          ellipsis: {
            tooltip: true,
          },
        },

        {
          ...WTablePresetCreatedAtColumn,
          sorter: {
            multiple: 3,
          },
        },

        {
          ...WTablePresetUpdatedAtColumn,
          sorter: {
            multiple: 4,
          },
        },

        {
          key: 'action',
          width: 80,
          extendType: 'action',
          fixed: 'right',
          onExtendActionType: async ({ type, rowData }) => {
            switch (type) {
              case 'read':
                await onApiTableReadAndOpenUpdateForm(rowData._id!)
                break

              default:
                break
            }
          },
        },
      ],
    },

    formProps: {
      localeUniqueKey: localeKey,
      localeWithTable: true,
      preset: 'modal',
      baseRules: true,
      labelWidth: 100,
      xGap: 0,
      // create/update form schemas
      schemas: [
        {
          type: 'Base:Input',
          formProp: {
            path: 'settingName',
          },
          componentProp: {
            clearable: true,
          },
        },

        {
          type: 'Base:Input',
          formProp: {
            path: 'settingKey',
          },
          componentProp: {
            clearable: true,
            disabled: computed(
              (): boolean => onGetActionType().value === 'update'
            ) as unknown as boolean,
          },
        },

        {
          type: 'Base:Input',
          formProp: {
            path: 'settingValue',
          },
          componentProp: {
            clearable: true,
          },
        },

        {
          type: 'Base:Input',
          formProp: {
            path: 'remark',
            rule: false,
          },
          componentProp: {
            clearable: true,
            type: 'textarea',
          },
        },
      ],
    },
  })
</script>

<style lang="scss" scoped></style>
