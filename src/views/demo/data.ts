export const options: BaseOptions<'value', 'label', 'disabled'>[] = [
  {
    value: 1,
    label: 'Beijing',
  },
  {
    value: 2,
    label: 'New York City',
    disabled: true,
  },
  {
    value: 3,
    label: 'Paris',
  },
  {
    value: 4,
    label: 'Tokyo',
  },
  {
    value: 5,
    label: 'London',
  },
]

export const TreeData = [
  {
    _id: 1,
    label: 'Level 1',
    children: [
      {
        _id: 4,
        label: 'Level 1-1',
        children: [
          {
            _id: 9,
            label: 'Level 1-1-1',
          },
          {
            _id: 10,
            label: 'Level 1-1-2',
          },
        ],
      },
      {
        _id: 11,
        label: 'Level 1-2',
        children: [
          {
            _id: 12,
            label: 'Level 1-2-1',
          },
          {
            _id: 13,
            label: 'Level 1-2-2',
            _disabled: true,
          },
        ],
      },
    ],
  },
  {
    _id: 2,
    label: 'Level 2',
    children: [
      {
        _id: 5,
        label: 'Level 2-1',
        children: [
          {
            _id: 14,
            label: 'Level 2-1-1',
          },
          {
            _id: 15,
            label: 'Level 2-1-2',
          },
        ],
      },
      {
        _id: 6,
        label: 'Level 2-2',
        children: [
          {
            _id: 16,
            label: 'Level 2-2-1',
          },
          {
            _id: 17,
            label: 'Level 2-2-2',
          },
        ],
      },
    ],
  },
  {
    _id: 3,
    label: 'Level 3',
    children: [
      {
        _id: 7,
        label: 'Level 3-1',
      },
      {
        _id: 8,
        label: 'Level 3-2',
      },
    ],
  },
]
