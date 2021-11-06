<template>
  <w-demo-card title="useTable" description="Better typescript support.">
    <w-table @hook="register"></w-table>
  </w-demo-card>
</template>

<script lang="ts">
  export default defineComponent({
    name: 'UseTable',

    setup() {
      const [register] = useTable({
        columns: [
          {
            type: 'selection',
          },
          {
            type: 'expand',
            renderExpand: (row) => 1,
          },
          {
            title: 'Name',
            key: 'name',
          },
          {
            title: 'Age',
            key: 'age',
          },
          {
            title: 'Address',
            key: 'address',
          },
          {
            key: 'icon',
            extendType: 'icon',
            extendIconName: 'ant-design:home-outlined',
          },
          {
            key: 'action',
            extendType: 'action',
          },
        ],
        data: [
          {
            key: 0,
            name: 'John Brown',
            age: 32,
            address: 'New York No. 1 Lake Park',
            tags: ['nice', 'developer'],
          },
          {
            key: 1,
            name: 'Jim Green',
            age: 42,
            address: 'London No. 1 Lake Park',
            tags: ['wow'],
          },
          {
            key: 2,
            name: 'Joe Black',
            age: 32,
            address: 'Sidney No. 1 Lake Park',
            tags: ['cool', 'teacher'],
          },
        ],
        pagination: {
          pageSize: 10,
        },
      })

      return {
        register,
      }
    },
  })
</script>

<style lang="scss" scoped></style>
