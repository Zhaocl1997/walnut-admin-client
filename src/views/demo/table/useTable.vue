<template>
  <el-card>
    <template #header>
      <el-alert
        title="useTable Hook"
        type="info"
        description="Use `useTable` hook to render. My personal understanding for this kind of usage is to enhance type support when adding props to table. 
        But since got `volar` plugin on `vscode`, it is also possible to get type support in template usage(also slot typed support. 
        One more to say, if you feel familiar with `tsx` usage, just forget the template type support thing😀). 
        So feel free to code with any kind of usage to render table! "
        show-icon
        :closable="false"
      >
      </el-alert>

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
