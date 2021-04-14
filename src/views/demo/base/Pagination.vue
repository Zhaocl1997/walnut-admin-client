<template>
  <el-card>
    <template #header>
      <span>Pagination：</span>
    </template>

    <w-title show-left
      >Pagenum: 【{{ pageNum }}】 PageSize: 【{{ pageSize }}】</w-title
    >
    <w-pagination
      v-model:currentPage="pageNum"
      v-model:pageSize="pageSize"
      :total="100"
    ></w-pagination>
  </el-card>
</template>

<script lang="ts">
  import { defineComponent, reactive, toRefs } from 'vue'

  export default defineComponent({
    name: 'PaginationDemo',

    setup() {
      const state = reactive({
        pageNum: 1,
        pageSize: 10,
      })

      return {
        ...toRefs(state),
      }
    },
  })
</script>

<style lang="scss" scoped></style>
