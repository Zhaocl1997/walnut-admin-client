<template>
  <el-card>
    <template #header>
      <span>useTable hook: </span>

      <w-json :value="tableHeaders"></w-json>
      <w-form v-model="tableConfig" inline @hook="registerForm"></w-form>
    </template>

    <w-table @hook="registerTable" @page="onPageChange">
      <template #status="{ row }">
        <el-switch v-model="row.status"></el-switch>
      </template>
    </w-table>
  </el-card>
</template>

<script lang="ts">
  import { defineComponent, reactive, ref, onMounted } from 'vue'
  import { mockListUser } from '/@/components/UI/Table/src/utils/mock'
  import { useTableConfig } from './configHeader'
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

      const { tableConfig, registerForm, tableHeaders } = useTableConfig()

      const [registerTable] = useTable({
        headers: tableHeaders,
        data: data,
        total: total,
        hasPage: tableConfig.page,
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
        tableConfig,
        registerForm,
        registerTable,
        onPageChange,
        tableHeaders,
      }
    },
  })
</script>

<style lang="scss" scoped></style>
