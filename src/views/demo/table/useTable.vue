<template>
  <el-card>
    <template #header>
      <span>useTable hook: </span>

      <WJson :value="tableHeaders"></WJson>
    </template>

    <w-table @hook="register" @page="onPageChange">
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
  import { useTable } from '/@/components/UI/Table'

  export default defineComponent({
    name: 'UseTableDemo',

    setup() {
      const data = ref([])
      const total = ref(0)
      const query = reactive({
        pageNum: 1,
        pageSize: 10,
      })

      const [register] = useTable({
        headers: tableHeaders,
        data: data,
        total: total,
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
        register,
        onPageChange,
        tableHeaders,
      }
    },
  })
</script>

<style lang="scss" scoped></style>
