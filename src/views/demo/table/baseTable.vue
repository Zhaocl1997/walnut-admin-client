<script lang="tsx">
export default defineComponent({
  name: 'BaseTable',

  setup() {
    const message = useAppMessage()

    return {
      columns: [],

      data: [],

      pagination: {
        pageSize: 10,
      },
    }
  },
})
</script>

<template>
  <w-demo-card title="Base Table" description="Simple usage of w-table.">
    <w-table :columns="columns" :data="data" :pagination="pagination" />
  </w-demo-card>
</template>
