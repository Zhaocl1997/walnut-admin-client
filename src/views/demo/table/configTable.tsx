import type { WTable } from '/@/components/UI/Table'

import { computed, reactive, ref, onMounted } from 'vue'
import { easyDeepSet } from 'easy-fns-ts'

import { useForm } from '/@/components/UI/Form'
import { useMessage } from '/@/hooks/component/useMessage'

import { mockListUser } from '/@/components/UI/Table/src/utils/mock'

const genderOptions: OptionDataItem[] = [
  {
    label: 'Female',
    value: 'F',
  },
  {
    label: 'Male',
    value: 'M',
  },
]

export const useTableConfig = () => {
  const data = ref<any[]>([])
  const total = ref(0)
  const query = reactive({
    pageNum: 1,
    pageSize: 10,
  })

  const tableConfig = reactive({
    page: false,
    settings: false,
    index: false,
    indexFn: false,
    select: false,
    expand: false,
    border: false,
    stripe: false,
    showHeader: true,
    action: false,
    actionType: 'slot' as WTable.Header.Extend.Action.Type,
    actionArrayConfig: 'default',
    nested: false,
    nestedItem: false,
    nameType: 'default' as WTable.Header.Item.Types,
    copy: false,
  })

  const [registerForm] = useForm({
    span: 8,
    schemas: [
      {
        type: 'Switch',
        formProp: {
          prop: 'page',
          label: 'Pagination',
        },
      },
      {
        type: 'Switch',
        formProp: {
          prop: 'settings',
          label: 'Settings',
        },
      },
      {
        type: 'Switch',
        formProp: {
          prop: 'index',
          label: 'Default Index',
        },
      },
      {
        type: 'Switch',
        formProp: {
          prop: 'indexFn',
          label: 'Index Function',
        },
        vIf: ({ formData }) => {
          return formData.index
        },
      },
      {
        type: 'Switch',
        formProp: {
          prop: 'select',
          label: 'Select',
        },
      },
      {
        type: 'Switch',
        formProp: {
          prop: 'expand',
          label: 'Expand',
        },
      },
      {
        type: 'Switch',
        formProp: {
          prop: 'border',
          label: 'Border',
        },
      },
      {
        type: 'Switch',
        formProp: {
          prop: 'stripe',
          label: 'Stripe',
        },
      },
      {
        type: 'Switch',
        formProp: {
          prop: 'showHeader',
          label: 'Show Header',
        },
      },
      {
        type: 'Switch',
        formProp: {
          prop: 'action',
          label: 'Action',
        },
      },
      {
        type: 'Radio',
        formProp: {
          prop: 'actionType',
          label: 'Action Type',
        },
        componentProp: {
          button: true,
          size: 'mini',
          options: [
            {
              value: 'slot',
              label: 'Slot',
            },
            {
              value: 'array',
              label: 'Array',
            },
          ],
        },
        vIf: ({ formData }) => {
          return formData.action
        },
      },
      {
        type: 'Radio',
        formProp: {
          prop: 'actionArrayConfig',
          label: 'Action Array config',
        },
        colProp: {
          span: 16,
        },
        componentProp: {
          button: true,
          size: 'mini',
          options: [
            {
              value: 'default',
              label: 'Default',
            },
            {
              value: 'config',
              label: 'Config',
            },
            {
              value: 'custom',
              label: 'Custom',
            },
          ],
        },
        vIf: ({ formData }) => {
          return formData.action && formData.actionType === 'array'
        },
      },
      {
        type: 'Switch',
        formProp: {
          prop: 'nested',
          label: 'Nested',
          labelClass: 'text-green-500',
        },
      },
      {
        type: 'Switch',
        formProp: {
          prop: 'nestedItem',
          label: 'Nested Item',
          labelClass: 'text-red-500',
        },
        vIf: ({ formData }) => {
          return formData.nested
        },
      },
      {
        type: 'Radio',
        formProp: {
          prop: 'nameType',
          label: 'Name Column Type',
        },
        colProp: {
          span: 16,
        },
        componentProp: {
          button: true,
          size: 'mini',
          options: [
            {
              value: 'default',
              label: 'Default',
            },
            {
              value: 'editable',
              label: 'Editable Input',
            },
            {
              value: 'slot',
              label: 'Slot',
            },
            {
              value: 'render',
              label: 'Render',
            },
          ],
        },
      },
      {
        type: 'Switch',
        formProp: {
          prop: 'copy',
          label: 'Copy Column',
        },
      },
    ],
  })

  const tableHeaders = computed((): WTable.Header.Item.Props[] => {
    return [
      // index column
      {
        columnProps: {
          type: 'index',
          width: '80',
          fixed: 'left',
          index: tableConfig.indexFn ? (i) => i * 2 : (i) => i,
        },
        visible: tableConfig.index,
      },

      // expand column
      {
        columnProps: {
          type: 'expand',
          width: '50',
          fixed: 'left',
        },
        visible: tableConfig.expand,
      },

      // selection column
      {
        columnProps: {
          type: 'selection',
          width: '50',
          fixed: 'left',
        },
        visible: tableConfig.select,
      },

      // different way to render column
      {
        type: tableConfig.nameType,
        columnProps: {
          label: 'Name',
          prop: 'name',
        },
        componentProps:
          tableConfig.nameType === 'editable'
            ? {
                editType: 'input',
              }
            : tableConfig.nameType === 'render'
            ? {
                render: (scope) => {
                  return <div>name render: {scope.row.name}</div>
                },
              }
            : ({ copy: tableConfig.copy } as any),
      },

      // nested columns
      {
        type: 'nested',
        columnProps: {
          label: 'Base Info',
          // item with `children`, `width` won't work
          width: '300',
          // item with `children`, `prop` doesn't mean anything either
          prop: 'some prop',
          labelClassName: 'text-green-500',
        },
        visible: tableConfig.nested,
        children: [
          {
            type: 'editable',
            columnProps: {
              label: 'Gender',
              prop: 'user.gender',
              width: '80',
            },
            componentProps: {
              editType: 'select',
              editTypeComponentProps: {
                options: genderOptions,
              },
            },
          },
          {
            type: 'editable',
            columnProps: {
              label: 'Age',
              prop: 'user.age',
              width: '100',
              formatter: (row) => `${row.user?.age} years`,
            },
            componentProps: {
              editType: 'inputNumber',
              editTypeComponentProps: {
                precision: 0,
                max: 99,
              },
            },
          },
          {
            type: 'editable',
            columnProps: {
              label: 'Phone',
              prop: 'user.phone',
              formatter: (row) =>
                row.user?.phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2'),
              labelClassName: 'text-red-500',
            },
            visible: tableConfig.nestedItem,
            componentProps: {
              editType: 'input',
            },
          },
        ],
      },

      // another nested columns
      {
        type: 'nested',
        columnProps: {
          label: 'Family Info',
          labelClassName: 'text-green-500',
        },
        visible: tableConfig.nested,
        children: [
          {
            type: 'nested',
            columnProps: {
              label: 'Mom',
            },
            children: [
              {
                type: 'editable',
                columnProps: {
                  label: 'Name',
                  prop: 'family.mom.name',
                },
              },

              {
                type: 'editable',
                columnProps: {
                  label: 'Age',
                  prop: 'family.mom.age',
                  formatter: (row) => `${row.family?.mom.age} years`,
                },
                componentProps: {
                  editType: 'inputNumber',
                },
              },

              {
                type: 'editable',
                columnProps: {
                  label: 'HasWork',
                  prop: 'family.mom.hasWork',
                  labelClassName: 'text-red-500',
                },
                visible: tableConfig.nestedItem,
                componentProps: {
                  editType: 'switch',
                  editTypeComponentProps: {
                    beforeChange: (val) => {
                      val.loadStart()
                      return new Promise((resolve) => {
                        setTimeout(() => {
                          easyDeepSet(val.row, val.prop, val.newValue)
                          useMessage({
                            type: 'success',
                            message: 'Switch success!',
                          })
                          val.loadEnd()
                          resolve(true)
                        }, 2000)
                      })
                    },
                  },
                },
              },
            ],
          },

          {
            type: 'nested',
            columnProps: {
              label: 'Dad',
            },
            children: [
              {
                columnProps: {
                  label: 'Name',
                  prop: 'family.dad.name',
                },
                componentProps: {
                  copy: tableConfig.copy,
                },
              },

              {
                columnProps: {
                  label: 'Age',
                  prop: 'family.dad.age',
                  formatter: (row) => `${row.family.dad.age} years`,
                },
              },

              {
                type: 'editable',
                columnProps: {
                  label: 'HasWork',
                  prop: 'family.dad.hasWork',
                  labelClassName: 'text-red-500',
                },
                visible: tableConfig.nestedItem,
                componentProps: {
                  editType: 'switch',
                  editTypeComponentProps: {
                    beforeChange: (val) => {
                      val.loadStart()
                      return new Promise((resolve) => {
                        setTimeout(() => {
                          easyDeepSet(val.row, val.prop, val.newValue)
                          useMessage({
                            type: 'success',
                            message: 'Switch success!',
                          })
                          val.loadEnd()
                          resolve(true)
                        }, 2000)
                      })
                    },
                  },
                },
              },
            ],
          },
        ],
      },

      // switch type
      {
        type: 'editable',
        columnProps: {
          label: 'Status',
          prop: 'status',
        },
        componentProps: {
          editType: 'switch',
          editTypeComponentProps: {
            beforeChange: (val) => {
              val.loadStart()
              return new Promise((resolve) => {
                setTimeout(() => {
                  easyDeepSet(val.row, val.prop, val.newValue)
                  useMessage({
                    type: 'success',
                    message: 'Switch success!',
                  })
                  val.loadEnd()
                  resolve(true)
                }, 2000)
              })
            },
          },
        },
      },

      {
        columnProps: {
          label: 'CreatedAt',
          prop: 'createdAt',
        },
      },

      {
        columnProps: {
          label: 'Description',
          prop: 'description',
          showOverflowTooltip: true,
        },
        componentProps: {
          copy: tableConfig.copy,
        },
      },

      // action column
      {
        type: 'action',
        visible: tableConfig.action,
        columnProps: {
          width: '180px',
          fixed: 'right',
        },
        componentProps: {
          actionType: tableConfig.actionType,

          actionConfig:
            tableConfig.actionArrayConfig === 'config'
              ? ['create', 'edit']
              : ['create', 'delete', 'edit'],

          actionButtonGroup:
            tableConfig.actionArrayConfig === 'custom'
              ? [
                  {
                    type: 'primary',
                    size: 'mini',
                    text: 'Custom1',
                    icon: 'el-icon-success',
                    onClick: (scope) => {
                      useMessage({ type: 'success', message: 'Custom1' })
                    },
                  },
                  {
                    type: 'info',
                    size: 'mini',
                    text: 'Custom2',
                    icon: 'el-icon-info',
                    onClick: (scope) => {
                      useMessage({ type: 'info', message: 'Custom2' })
                    },
                  },
                  {
                    type: 'warning',
                    size: 'mini',
                    text: 'Custom3',
                    icon: 'el-icon-question',
                    onClick: (scope) => {
                      useMessage({ type: 'warning', message: 'Custom3' })
                    },
                  },
                ]
              : [],
        },
      },
    ]
  })

  const onGetList = () => {
    const res = mockListUser(query)
    data.value = res.data
    total.value = res.total
  }

  onMounted(() => {
    onGetList()
  })

  const onAction = ({ type, scope }: WTable.Params.Action) => {
    useMessage({ type: 'success', message: type })
  }

  const onEdit = ({
    loadEnd,
    loadStart,
    newValue,
    prop,
    row,
  }: WTable.Params.Edit) => {
    loadStart()
    setTimeout(() => {
      easyDeepSet(row, prop, newValue)
      loadEnd()
      useMessage({ type: 'success', message: 'Edit success!' })
    }, 2000)
  }

  const onPage = ({ pageNum, pageSize }: WTable.Params.Page) => {
    query.pageNum = pageNum
    query.pageSize = pageSize
    onGetList()
  }

  return {
    data,
    total,
    query,

    onAction,
    onEdit,
    onPage,

    tableConfig,
    registerForm,
    tableHeaders,
  }
}
