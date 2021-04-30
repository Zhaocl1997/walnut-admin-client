<template>
  <el-card>
    <template #header>
      <span>Base table: </span>

      <WJson :value="tableHeaders"></WJson>
      <w-form
        v-model="tableConfig"
        inline
        @hook="registerTableConfigForm"
      ></w-form>
    </template>

    <w-table
      :headers="tableHeaders"
      :data="data"
      :total="total"
      has-page
      @page="onPageChange"
      :has-index="hasIndex"
      :has-select="hasSelect"
      :has-expand="hasExpand"
      :has-action="hasAction"
    >
      <template #status="{ row }">
        <el-switch v-model="row.status"></el-switch>
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
  import { tableHeaders } from './headers'
  import { useForm } from '/@/components/UI/Form'

  export default defineComponent({
    name: 'BaseTableDemo',

    setup() {
      const data = ref([])
      const total = ref(0)
      const query = reactive({
        pageNum: 1,
        pageSize: 10,
      })

      const tableConfig = reactive({
        hasIndex: false,
        hasSelect: false,
        hasExpand: false,
        hasAction: false,
      })

      const [registerTableConfigForm] = useForm({
        schemas: [
          {
            type: 'Switch',
            formProp: {
              prop: 'hasIndex',
              label: 'Index',
            },
          },
          {
            type: 'Switch',
            formProp: {
              prop: 'hasSelect',
              label: 'Select',
            },
          },
          {
            type: 'Switch',
            formProp: {
              prop: 'hasExpand',
              label: 'Expand',
            },
          },
          {
            type: 'Switch',
            formProp: {
              prop: 'hasAction',
              label: 'Action',
            },
          },
        ],
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
        ...toRefs(tableConfig),
        tableConfig,
        registerTableConfigForm,
        tableHeaders,
        data,
        total,
        onPageChange,
      }
    },
  })
</script>

<style lang="scss" scoped></style>
