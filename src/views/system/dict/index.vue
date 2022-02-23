<template>
  <WCRUD @hook="register"></WCRUD>
</template>

<script lang="ts">
  export default defineComponent({
    name: 'Dict',
  })
</script>

<script lang="ts" setup>
  import { dictTypeAPI } from '/@/api/system/dict'

  // locale unique key
  const key = 'dictType'

  const [register, { onCreateAndOpen, onReadAndOpen, onDelete }] =
    useCRUD<AppDictType>({
      baseAPI: dictTypeAPI,

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
          labelWidth: 100,
          // query form schemas
          schemas: [
            {
              type: 'Base:Input',
              formProp: {
                path: 'name',
              },
              componentProp: {
                clearable: true,
              },
            },

            {
              type: 'Base:Input',
              formProp: {
                path: 'type',
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
              },
            },

            {
              type: 'Extend:Query',
            },
          ],
        },

        columns: [
          {
            key: 'name',
            width: 120,
          },

          {
            key: 'type',
            width: 140,
            extendType: 'link',
            onClick: (p) => {
              // TODO simple encode
              useRouterPush({
                name: 'DictDetail',
                params: { id: p._id },
                query: { name: p.name },
              })
            },
          },

          {
            key: 'description',
            width: 200,
          },

          {
            ...WTablePresetStatusColumn,
            sorter: {
              multiple: 2,
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
            width: 240,
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
        labelWidth: 100,
        xGap: 0,
        // create/update form schemas
        schemas: [
          {
            type: 'Base:Input',
            formProp: {
              path: 'name',
            },
            componentProp: {
              clearable: true,
            },
          },

          {
            type: 'Base:Input',
            formProp: {
              path: 'type',
            },
            componentProp: {
              clearable: true,
            },
          },

          {
            type: 'Base:Input',
            formProp: {
              path: 'description',
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
