<template>
  <el-card>
    <template #header>
      <span>Base table: </span>

      <WJson :value="tableHeaders"></WJson>
    </template>

    <w-table
      :headers="tableHeaders"
      :data="data"
      :total="total"
      has-page
      @page="onPageChange"
    >
      <template #status="{ row }">
        <el-switch v-model="row.status"></el-switch>
      </template>
    </w-table>
  </el-card>
</template>

<script lang="ts">
  import { defineComponent, reactive, ref, onMounted } from 'vue'
  import { mockListUser } from '/@/components/UI/Table/src/utils/mock'
  import { tableHeaders } from './headers'

  export default defineComponent({
    name: 'BaseTableDemo',

    setup() {
      const data = ref([])
      const total = ref(0)
      const query = reactive({
        pageNum: 1,
        pageSize: 10,
      })

      const onPageChange = ({ pageNum, pageSize }) => {
        query.pageNum = pageNum
        query.pageSize = pageSize
        onGetList()
      }

      const onGetList = () => {
        const res = mockListUser(query)
        data.value = res.data
        total.value = res.total
      }

      onMounted(() => {
        onGetList()
      })

      return {
        tableHeaders,
        data,
        total,
        onPageChange,
      }
    },
  })
</script>

<style lang="scss" scoped></style>
