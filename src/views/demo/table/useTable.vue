<template>
  <el-card>
    <template #header>
      <span>useTable hook: </span>

      <w-json :value="tableHeaders" resizable></w-json>
      <w-form v-model="tableConfig" @hook="registerForm"></w-form>
    </template>

    <w-table @hook="registerTable" @page="onPage">
      <template #expand="{ row }">
        <span>expand slot</span>
      </template>

      <template #action="{ row }">
        <span>action slot</span>
      </template>
    </w-table>
  </el-card>
</template>

<script lang="ts">
  import { defineComponent, reactive, ref, onMounted, computed } from 'vue'
  import { mockListUser } from '/@/components/UI/Table/src/utils/mock'
  import { useTableConfig } from './configHeader'
  import { useTable } from '/@/components/UI/Table'

  export default defineComponent({
    name: 'UseTableDemo',

    setup() {
      const data = ref<any[]>([])
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
        hasPage: computed(() => tableConfig.page),
        border: computed(() => tableConfig.border),
        stripe: computed(() => tableConfig.stripe),
        showHeader: computed(() => tableConfig.showHeader),
        pageNum: query.pageNum,
        pageSize: query.pageSize,
      })

      const onPage = ({
        pageNum,
        pageSize,
      }: {
        pageNum: number
        pageSize: number
      }) => {
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
        onPage,
        tableHeaders,
      }
    },
  })
</script>

<style lang="scss" scoped></style>
