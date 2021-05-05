<template>
  <el-card>
    <template #header>
      <span>Base table: </span>

      <w-json :value="tableHeaders"></w-json>
      <w-form v-model="tableConfig" inline @hook="registerForm"></w-form>
    </template>

    <w-table
      :headers="tableHeaders"
      :data="data"
      :total="total"
      :has-page="tableConfig.page"
      @page="onPageChange"
    >
      <template #status="{ row }">
        <el-switch v-model="row.status"></el-switch>
      </template>

      <template #family.dad.hasWork="{ row }">
        <el-switch v-model="row.family.dad.hasWork"></el-switch>
      </template>

      <template #family.mom.hasWork="{ row }">
        <el-switch v-model="row.family.mom.hasWork"></el-switch>
      </template>

      <template #expand="{ row }">
        <span>expand {{ row }}</span>
      </template>

      <template #action="{ row }">
        <span>action</span>
      </template>
    </w-table>
  </el-card>
</template>

<script lang="ts">
  import { defineComponent, reactive, ref, onMounted, toRefs } from 'vue'
  import { mockListUser } from '/@/components/UI/Table/src/utils/mock'
  import { useTableConfig } from './configHeader'

  export default defineComponent({
    name: 'BaseTableDemo',

    setup() {
      const data = ref<any[]>([])
      const total = ref(0)
      const query = reactive({
        pageNum: 1,
        pageSize: 10,
      })

      const { tableConfig, registerForm, tableHeaders } = useTableConfig()

      const onPageChange = ({
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
        tableHeaders,
        data,
        total,
        onPageChange,
      }
    },
  })
</script>

<style lang="scss" scoped></style>
