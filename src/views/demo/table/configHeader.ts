import type { WTableHeaderItem, WTableActionType } from '/@/components/UI/Table'

import { computed, reactive } from 'vue'

import { useForm } from '/@/components/UI/Form'

export const useTableConfig = () => {
  const tableConfig = reactive({
    page: false,
    index: false,
    indexFn: false,
    select: false,
    expand: false,
    border: false,
    stripe: false,
    showHeader: true,
    action: false,
    actionType: 'slot',
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
        },
      },
      {
        type: 'Switch',
        formProp: {
          prop: 'nestedItem',
          label: 'Nested Item',
        },
        vIf: ({ formData }) => {
          return formData.nested
        },
      },
    ],
  })

  const tableHeaders = computed((): WTableHeaderItem[] => {
    return [
      {
        type: 'index',
        visible: tableConfig.index,
        width: '80',
        align: 'center',
        fixed: 'left',
        index: tableConfig.indexFn ? (i) => i * 2 : (i) => i,
      },

      {
        type: 'expand',
        visible: tableConfig.expand,
        width: '50',
        align: 'center',
        fixed: 'left',
      },

      {
        type: 'selection',
        visible: tableConfig.select,
        width: '50',
        align: 'center',
        fixed: 'left',
      },

      {
        type: 'action',
        visible: tableConfig.action,
        width: '180px',
        align: 'center',
        fixed: 'right',
        actionType: tableConfig.actionType as WTableActionType,

        actionConfig:
          tableConfig.actionArrayConfig === 'config'
            ? ['create', 'edit']
            : ['create', 'delete', 'edit'],

        buttonGroup:
          tableConfig.actionArrayConfig === 'custom'
            ? [
                {
                  type: 'primary',
                  size: 'mini',
                  text: 'Custom1',
                  icon: 'el-icon-success',
                  onClick: (scope) => {
                    console.log(scope)
                  },
                },
                {
                  type: 'info',
                  size: 'mini',
                  text: 'Custom2',
                  icon: 'el-icon-info',
                  onClick: (scope) => {
                    console.log(scope)
                  },
                },
                {
                  type: 'warning',
                  size: 'mini',
                  text: 'Custom3',
                  icon: 'el-icon-question',
                  onClick: (scope) => {
                    console.log(scope)
                  },
                },
              ]
            : [],
      },

      {
        label: 'Name',
        prop: 'name',
        align: 'center',
      },

      {
        label: 'Base Info',
        // item with children, `width` won't work
        width: '300',
        // item with children, `prop` doesn't mean anything either
        prop: 'some prop',
        visible: tableConfig.nested,
        align: 'center',
        labelClassName: 'text-green-500',
        children: [
          {
            label: 'Gender',
            prop: 'user.gender',
            width: '80',
            align: 'center',
          },
          {
            label: 'Age',
            prop: 'user.age',
            width: '100',
            formatter: (row) => `${row.user.age} years`,
            align: 'center',
          },
          {
            label: 'Phone',
            prop: 'user.phone',
            width: '120',
            formatter: (row) =>
              row.user.phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2'),
            visible: tableConfig.nestedItem,
            labelClassName: 'text-red-500',
            align: 'center',
          },
        ],
      },

      {
        label: 'Family Info',
        visible: tableConfig.nested,
        align: 'center',
        labelClassName: 'text-green-500',
        children: [
          {
            label: 'Mom',
            align: 'center',
            children: [
              {
                label: 'Name',
                prop: 'family.mom.name',
                align: 'center',
              },
              {
                label: 'Age',
                prop: 'family.mom.age',
                formatter: (row) => `${row.family.mom.age} years`,
                align: 'center',
              },
              {
                label: 'HasWork',
                prop: 'family.mom.hasWork',
                visible: tableConfig.nestedItem,
                labelClassName: 'text-red-500',
                align: 'center',
                type: 'switch',
              },
            ],
          },
          {
            label: 'Dad',
            align: 'center',
            children: [
              {
                label: 'Name',
                prop: 'family.dad.name',
                align: 'center',
              },
              {
                label: 'Age',
                prop: 'family.dad.age',
                formatter: (row) => `${row.family.dad.age} years`,
                align: 'center',
              },
              {
                label: 'HasWork',
                prop: 'family.dad.hasWork',
                visible: tableConfig.nestedItem,
                labelClassName: 'text-red-500',
                align: 'center',
                type: 'switch',
              },
            ],
          },
        ],
      },

      {
        label: 'Status',
        prop: 'status',
        type: 'switch',
        align: 'center',
        beforeChange: () => {
          return new Promise((resolve) => {
            setTimeout(() => {
              // ElMessage.success('切换成功')
              resolve(true)
            }, 1000)
          })
        },
      },

      {
        label: 'CreatedAt',
        prop: 'createdAt',
        align: 'center',
      },

      {
        label: 'Description',
        prop: 'description',
        align: 'center',
        showOverflowTooltip: true,
      },
    ]
  })

  return {
    tableConfig,
    registerForm,
    tableHeaders,
  }
}
