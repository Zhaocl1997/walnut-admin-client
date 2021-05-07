<template>
  <el-card>
    <template #header>
      <span>Base table: </span>

      <w-json :value="tableHeaders" resizable></w-json>
      <w-form v-model="tableConfig" @hook="registerForm"></w-form>
    </template>

    <w-table
      :headers="tableHeaders"
      :data="data"
      :total="total"
      :has-page="tableConfig.page"
      :page-num="query.pageNum"
      :page-size="query.pageSize"
      :border="tableConfig.border"
      :stripe="tableConfig.stripe"
      :show-header="tableConfig.showHeader"
      row-key="id"
      @page="onPage"
      @action="onAction"
      @edit="onEdit"
    >
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
  import type { WTableEditCellEmitParams } from '/@/components/UI/Table'
  import { defineComponent, reactive, ref, onMounted } from 'vue'
  import { mockListUser } from '/@/components/UI/Table/src/utils/mock'
  import { useTableConfig } from './configHeader'
  import { useMessage } from '/@/hooks/component/useMessage'
  import { easyDeepSet } from 'easy-fns-ts'

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

      const onAction = (type: string, scope: any) => {
        useMessage({ type: 'success', message: type })
      }

      const onEdit = (val: WTableEditCellEmitParams) => {
        val.loadStart()
        setTimeout(() => {
          easyDeepSet(val.row, val.prop, val.newValue)
          val.loadEnd()
          useMessage({ type: 'success', message: 'Edit success!' })
        }, 2000)
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
        query,
        onPage,
        onAction,
        onEdit,
      }
    },
  })
</script>

<style lang="scss" scoped></style>
