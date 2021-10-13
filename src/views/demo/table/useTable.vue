<template>
  <w-demo-card title="useTable" description="Better typescript support.">
    <w-table @hook="register"></w-table>
  </w-demo-card>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'

  import { useTable } from '/@/components/UI/Table'

  export default defineComponent({
    name: 'UseTable',

    setup() {
      const [register] = useTable({
        columns: [
          {
            type: 'selection',
          },
          {
            type: 'expand',
            renderExpand: (row) => 1,
          },
          {
            title: 'Name',
            key: 'name',
          },
          {
            title: 'Age',
            key: 'age',
          },
          {
            title: 'Address',
            key: 'address',
          },
          {
            extendType: 'action',
          },
          {
            extendType: 'icon',
            extendIconName: 'ant-design:home-outlined',
          },
        ],
        data: [
          {
            key: 0,
            name: 'John Brown',
            age: 32,
            address: 'New York No. 1 Lake Park',
            tags: ['nice', 'developer'],
          },
          {
            key: 1,
            name: 'Jim Green',
            age: 42,
            address: 'London No. 1 Lake Park',
            tags: ['wow'],
          },
          {
            key: 2,
            name: 'Joe Black',
            age: 32,
            address: 'Sidney No. 1 Lake Park',
            tags: ['cool', 'teacher'],
          },
        ],
        pagination: {
          pageSize: 10,
        },
      })

      return {
        register,
      }
    },
  })
</script>

<style lang="scss" scoped></style>

<!-- <template>
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

      <w-JSON :value="tableHeaders" resizable></w-JSON>
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

<style lang="scss" scoped></style> -->
