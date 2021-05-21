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

    <w-table @hook="registerTable">
      <template #name="{ row }">
        <span>name slot: {{ row.name }}</span>
      </template>

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
  import { defineComponent, computed } from 'vue'
  import { useTableConfig } from './configTable'
  import { useTable } from '/@/components/UI/Table'

  export default defineComponent({
    name: 'UseTableDemo',

    setup() {
      const {
        data,
        total,
        query,

        onAction,
        onEdit,
        onPage,

        tableConfig,
        registerForm,
        tableHeaders,
      } = useTableConfig()

      const [registerTable] = useTable({
        headers: tableHeaders,
        data: data,
        total: total,
        rowKey: 'id',
        hasPage: computed(() => tableConfig.page),
        hasSettings: computed(() => tableConfig.settings),
        border: computed(() => tableConfig.border),
        stripe: computed(() => tableConfig.stripe),
        showHeader: computed(() => tableConfig.showHeader),
        size: computed(() => tableConfig.size),
        loading: computed(() => tableConfig.loading),
        pageNum: query.pageNum,
        pageSize: query.pageSize,
        onAction,
        onEdit,
        onPage,
      })

      return {
        tableConfig,
        registerForm,
        registerTable,
        tableHeaders,
      }
    },
  })
</script>

<style lang="scss" scoped></style>
