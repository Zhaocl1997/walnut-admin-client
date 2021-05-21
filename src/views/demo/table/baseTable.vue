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
      :has-settings="tableConfig.settings"
      :page-num="query.pageNum"
      :page-size="query.pageSize"
      :border="tableConfig.border"
      :stripe="tableConfig.stripe"
      :size="tableConfig.size"
      :loading="tableConfig.loading"
      :show-header="tableConfig.showHeader"
      row-key="id"
      @page="onPage"
      @action="onAction"
      @edit="onEdit"
    >
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
  import { defineComponent } from 'vue'
  import { useTableConfig } from './configTable'

  export default defineComponent({
    name: 'BaseTableDemo',

    setup() {
      return useTableConfig()
    },
  })
</script>

<style lang="scss" scoped></style>
