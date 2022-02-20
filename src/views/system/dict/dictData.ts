import { formatTime } from 'easy-fns-ts'

import { dictDataAPI } from '/@/api/system/dict'

export const useDictDataRegister = (typeId: string) => {
  const { t } = useAppI18n()

  // locale unique key
  const key = 'dictData'

  const [registerDictData, { onCreateAndOpen, onReadAndOpen, onDelete }] =
    useCRUD<AppDictData>({
      baseAPI: dictDataAPI,

      defaultFormData: {
        typeId,
        order: 0,
        status: true,
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

        columns: [
          {
            key: 'label',
            width: 120,
            align: 'center',
            extendType: 'formatter',
            formatter: (row) => t(row.label!),
          },

          {
            key: 'value',
            width: 120,
            align: 'center',
          },

          {
            key: 'order',
            width: 100,
            align: 'center',
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
              multiple: 3,
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
              path: 'typeId',
            },
            componentProp: {
              clearable: true,
            },
            extraProp: {
              vShow: false,
            },
          },

          {
            type: 'Base:Input',
            formProp: {
              path: 'label',
            },
            componentProp: {
              clearable: true,
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

  return registerDictData
}
