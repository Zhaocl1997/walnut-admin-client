import type { WTableHeaderItem } from '/@/components/UI/Table'

export const tableHeaders: WTableHeaderItem[] = [
  {
    label: 'Name',
    prop: 'name',
  },

  {
    label: 'Base Info',
    // item width children, width won't work
    width: '300',
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
      },
    ],
  },

  {
    label: 'Family Info',
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
