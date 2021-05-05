import type { WTableHeaderItem } from '/@/components/UI/Table'

import { computed, reactive } from 'vue'

import { useForm } from '/@/components/UI/Form'

export const useTableConfig = () => {
  const tableConfig = reactive({
    page: false,
    index: false,
    select: false,
    expand: false,
    action: false,
    nested: false,
    nestedItem: false,
  })

  const [registerForm] = useForm({
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
          label: 'Index',
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
          prop: 'action',
          label: 'Action',
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
        vShow: ({ formData }) => {
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
      },

      {
        type: 'expand',
        visible: tableConfig.expand,
      },

      {
        type: 'selection',
        visible: tableConfig.select,
      },

      {
        extType: 'action',
        visible: tableConfig.action,
      },

      {
        label: 'Name',
        prop: 'name',
      },

      {
        label: 'Base Info',
        // item with children, `width` won't work
        width: '300',
        // item with children, `prop` doesn't mean anything either
        prop: 'some prop',
        visible: tableConfig.nested,
        children: [
          {
            label: 'Gender',
            prop: 'user.gender',
            width: '80',
          },
          {
            label: 'Age',
            prop: 'user.age',
            width: '100',
            formatter: (row) => `${row.user.age} years`,
          },
          {
            label: 'Phone',
            prop: 'user.phone',
            width: '120',
            formatter: (row) =>
              row.user.phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2'),
            visible: tableConfig.nestedItem,
          },
        ],
      },

      {
        label: 'Family Info',
        visible: tableConfig.nested,
        children: [
          {
            label: 'Mom',
            children: [
              {
                label: 'Name',
                prop: 'family.mom.name',
              },
              {
                label: 'Age',
                prop: 'family.mom.age',
                formatter: (row) => `${row.family.mom.age} years`,
              },
              {
                label: 'HasWork',
                prop: 'family.mom.hasWork',
                visible: tableConfig.nestedItem,
              },
            ],
          },
          {
            label: 'Dad',
            children: [
              {
                label: 'Name',
                prop: 'family.dad.name',
              },
              {
                label: 'Age',
                prop: 'family.dad.age',
                formatter: (row) => `${row.family.dad.age} years`,
              },
              {
                label: 'HasWork',
                prop: 'family.dad.hasWork',
                visible: tableConfig.nestedItem,
              },
            ],
          },
        ],
      },

      {
        label: 'Status',
        prop: 'status',
      },

      {
        label: 'CreatedAt',
        prop: 'createdAt',
      },

      {
        label: 'Description',
        prop: 'description',
      },
    ]
  })

  return {
    tableConfig,
    registerForm,
    tableHeaders,
  }
}
