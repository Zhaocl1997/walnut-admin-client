import { formatTime } from 'easy-fns-ts'

import { dictTypeAPI } from '/@/api/system/dict'

export const useDictTypeRegister = () => {
  // locale unique key
  const key = 'dictType'

  const [registerDictType, { onCreateAndOpen, onReadAndOpen, onDelete }] =
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

        columns: [
          {
            key: 'name',
            width: 120,
            align: 'center',
          },

          {
            key: 'type',
            width: 140,
            align: 'center',
            extendType: 'link',
            onClick: (p) => {
              // TODO make menu can pass dynamic params
              useRouterPush({
                name: 'Dict',
                query: { id: p._id, name: p.name },
                replace: true,
              })
            },
          },

          {
            key: 'description',
            width: 200,
            align: 'center',
          },

          {
            key: 'status',
            width: 100,
            align: 'center',
            extendType: 'dict',
            dictType: 'sys_shared_status',
            tagProps: (row) => ({
              type: row.status ? 'primary' : 'error',
            }),
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

  return registerDictType
}
