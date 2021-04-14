export const objectDemo = {
  name: 'Jack',
  age: 23,
  isSingle: true,
  hobbies: {
    indoor: ['books', 'movies'],
    outdoor: ['jogging', 'swimming'],
  },
  family: [
    {
      name: 'Rose',
      relationship: 'girlfriend',
      age: 21,
      collage: 'WTF1',
    },
    {
      name: 'Ana',
      relationship: 'mom',
      age: 48,
      collage: 'WTF2',
    },
  ],
}

export const arrayDemo = [
  {
    label: 'sex',
    prop: 'sex',
    width: '80px',
    sortable: 'custom',
    visible: true,
  },
  {
    label: 'age',
    prop: 'age',
    width: '200px',
    formatter: '({ age }) => `${age}岁`',
    editable: true,
    editableSlot: true,
    visible: true,
  },
  {
    label: 'province',
    prop: 'province',
    width: '100px',
    filters: [
      {
        text: 'Beijing',
        value: 'Beijing',
      },
      {
        text: 'New York City',
        value: 'NYC',
      },
      {
        text: 'Pairs',
        value: 'Pairs',
      },
      {
        text: 'Shanghai',
        value: 'Shanghai',
      },
    ],
    filterPlacement: 'bottom-end',
    visible: true,
  },
]
