import type {
  WTableHeaderItem,
  WTableHeaderItemNew,
  WTableEditableColumnActionType,
} from '/@/components/UI/Table'

import { computed, reactive } from 'vue'

import { useForm } from '/@/components/UI/Form'
import { useMessage } from '/@/hooks/component/useMessage'
import { easyDeepSet } from 'easy-fns-ts'

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
    actionType: 'slot' as WTableEditableColumnActionType,
    actionArrayConfig: 'default',
    nested: false,
    nestedItem: false,
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
    ],
  })

  const tableHeaders = computed((): WTableHeaderItemNew[] => {
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

      // common column
      {
        columnProps: {
          label: 'Name',
          prop: 'name',
        },
      },

      // nested columns
      {
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
            columnProps: {
              label: 'Gender',
              prop: 'user.gender',
              width: '80',
            },
          },
          {
            columnProps: {
              label: 'Age',
              prop: 'user.age',
              width: '100',
              formatter: (row) => `${row.user?.age} years`,
            },
          },
          {
            columnProps: {
              label: 'Phone',
              prop: 'user.phone',
              formatter: (row) =>
                row.user?.phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2'),
              labelClassName: 'text-red-500',
            },
            visible: tableConfig.nestedItem,
          },
        ],
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
    // return [
    //   {
    //     type: 'index',
    //     visible: tableConfig.index,
    //     width: '80',
    //     fixed: 'left',
    //     index: tableConfig.indexFn ? (i) => i * 2 : (i) => i,
    //   },

    //   {
    //     type: 'expand',
    //     visible: tableConfig.expand,
    //     width: '50',
    //     fixed: 'left',
    //   },

    //   {
    //     type: 'selection',
    //     visible: tableConfig.select,
    //     width: '50',
    //     fixed: 'left',
    //   },

    //   {
    //     type: 'action',
    //     visible: tableConfig.action,
    //     width: '180px',
    //     fixed: 'right',
    //     actionType: tableConfig.actionType,

    //     actionConfig:
    //       tableConfig.actionArrayConfig === 'config'
    //         ? ['create', 'edit']
    //         : ['create', 'delete', 'edit'],

    //     actionButtonGroup:
    //       tableConfig.actionArrayConfig === 'custom'
    //         ? [
    //             {
    //               type: 'primary',
    //               size: 'mini',
    //               text: 'Custom1',
    //               icon: 'el-icon-success',
    //               onClick: (scope) => {
    //                 useMessage({ type: 'success', message: 'Custom1' })
    //               },
    //             },
    //             {
    //               type: 'info',
    //               size: 'mini',
    //               text: 'Custom2',
    //               icon: 'el-icon-info',
    //               onClick: (scope) => {
    //                 useMessage({ type: 'info', message: 'Custom2' })
    //               },
    //             },
    //             {
    //               type: 'warning',
    //               size: 'mini',
    //               text: 'Custom3',
    //               icon: 'el-icon-question',
    //               onClick: (scope) => {
    //                 useMessage({ type: 'warning', message: 'Custom3' })
    //               },
    //             },
    //           ]
    //         : [],
    //   },

    //   {
    //     label: 'Name',
    //     prop: 'name',
    //     type: 'editable',
    //     editType: 'input',
    //   },

    //   {
    //     label: 'Base Info',
    //     // item with children, `width` won't work
    //     width: '300',
    //     // item with children, `prop` doesn't mean anything either
    //     prop: 'some prop',
    //     visible: tableConfig.nested,
    //     labelClassName: 'text-green-500',
    //     children: [
    //       {
    //         label: 'Gender',
    //         prop: 'user.gender',
    //         width: '80',
    //         type: 'editable',
    //         editType: 'select',
    //         editTypeComponentProps: {
    //           options: genderOptions,
    //         },
    //       },
    //       {
    //         label: 'Age',
    //         prop: 'user.age',
    //         width: '100',
    //         formatter: (row) => `${row.user?.age} years`,
    //         type: 'editable',
    //         editType: 'inputNumber',
    //         editTypeComponentProps: {
    //           precision: 0,
    //           max: 99,
    //         },
    //       },
    //       {
    //         label: 'Phone',
    //         prop: 'user.phone',
    //         formatter: (row) =>
    //           row.user?.phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2'),
    //         visible: tableConfig.nestedItem,
    //         labelClassName: 'text-red-500',
    //         type: 'editable',
    //         editType: 'input',
    //       },
    //     ],
    //   },

    //   {
    //     label: 'Family Info',
    //     visible: tableConfig.nested,
    //     labelClassName: 'text-green-500',
    //     children: [
    //       {
    //         label: 'Mom',
    //         children: [
    //           {
    //             label: 'Name',
    //             prop: 'family.mom.name',
    //           },
    //           {
    //             label: 'Age',
    //             prop: 'family.mom.age',
    //             formatter: (row) => `${row.family.mom.age} years`,
    //           },
    //           {
    //             label: 'HasWork',
    //             prop: 'family.mom.hasWork',
    //             visible: tableConfig.nestedItem,
    //             labelClassName: 'text-red-500',
    //             type: 'editable',
    //             editType: 'switch',
    //             editTypeComponentProps: {
    //               beforeChange: (val) => {
    //                 val.loadStart()
    //                 return new Promise((resolve) => {
    //                   setTimeout(() => {
    //                     easyDeepSet(val.row, val.prop, val.newValue)
    //                     useMessage({
    //                       type: 'success',
    //                       message: 'Switch success!',
    //                     })
    //                     val.loadEnd()
    //                     resolve(true)
    //                   }, 2000)
    //                 })
    //               },
    //             },
    //           },
    //         ],
    //       },
    //       {
    //         label: 'Dad',
    //         children: [
    //           {
    //             label: 'Name',
    //             prop: 'family.dad.name',
    //           },
    //           {
    //             label: 'Age',
    //             prop: 'family.dad.age',
    //             formatter: (row) => `${row.family.dad.age} years`,
    //           },
    //           {
    //             label: 'HasWork',
    //             prop: 'family.dad.hasWork',
    //             visible: tableConfig.nestedItem,
    //             labelClassName: 'text-red-500',
    //             type: 'editable',
    //             editType: 'switch',
    //             editTypeComponentProps: {
    //               beforeChange: (val) => {
    //                 val.loadStart()
    //                 return new Promise((resolve) => {
    //                   setTimeout(() => {
    //                     easyDeepSet(val.row, val.prop, val.newValue)
    //                     useMessage({
    //                       type: 'success',
    //                       message: 'Switch success!',
    //                     })
    //                     val.loadEnd()
    //                     resolve(true)
    //                   }, 2000)
    //                 })
    //               },
    //             },
    //           },
    //         ],
    //       },
    //     ],
    //   },

    //   {
    //     label: 'Status',
    //     prop: 'status',
    //     type: 'editable',
    //     editType: 'switch',
    //     editTypeComponentProps: {
    //       beforeChange: (val) => {
    //         val.loadStart()
    //         return new Promise((resolve) => {
    //           setTimeout(() => {
    //             easyDeepSet(val.row, val.prop, val.newValue)
    //             useMessage({ type: 'success', message: 'Switch success!' })
    //             val.loadEnd()
    //             resolve(true)
    //           }, 2000)
    //         })
    //       },
    //     },
    //   },

    //   {
    //     label: 'CreatedAt',
    //     prop: 'createdAt',
    //   },

    //   {
    //     label: 'Description',
    //     prop: 'description',
    //     showOverflowTooltip: true,
    //   },
    // ]
  })

  return {
    tableConfig,
    registerForm,
    tableHeaders,
  }
}
