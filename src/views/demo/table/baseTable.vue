<template>
  <w-demo-card title="Base Table" description="Simple usage of w-table.">
    <w-table-new
      :columns="columns"
      :data="data"
      :pagination="pagination"
    ></w-table-new>
  </w-demo-card>
</template>

<script lang="ts">
  import { defineComponent, h } from 'vue'

  import { NTag, NButton, useMessage } from 'naive-ui'

  import WTableNew from '/@/components/UINew/Table'

  export default defineComponent({
    name: 'BaseTable',

    components: { WTableNew },

    setup() {
      const message = useMessage()

      return {
        columns: [
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
            title: 'Tags',
            key: 'tags',
            render(row) {
              const tags = row.tags.map((tagKey) => {
                return h(
                  NTag,
                  {
                    style: {
                      marginRight: '6px',
                    },
                    type: 'info',
                  },
                  {
                    default: () => tagKey,
                  }
                )
              })
              return tags
            },
          },
          {
            title: 'Action',
            key: 'actions',
            render(row) {
              return h(
                NButton,
                {
                  size: 'small',
                  onClick: () => message.info('send mail to ' + row.name),
                },
                { default: () => 'Send Email' }
              )
            },
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
      }
    },
  })
</script>

<style lang="scss" scoped></style>

<!-- <template>
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

<style lang="scss" scoped></style> -->
