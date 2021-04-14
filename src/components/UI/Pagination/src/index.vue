<template>
  <el-pagination
    v-bind="getBindValue"
    @size-change="onSizeChange"
    @current-change="onCurrentChange"
  >
    <slot />
  </el-pagination>
</template>

<script lang="ts">
  import type { SetupContext } from 'vue'
  import type { WPaginationProps } from './types'
  import { defineComponent, computed, ref } from 'vue'
  import props from './props'

  export default defineComponent({
    name: 'WPagination',

    inheritAttrs: false,

    props: props,

    emits: ['change', 'update:pageSize', 'update:currentPage'],

    setup(props: WPaginationProps, ctx: SetupContext) {
      const { attrs, emit } = ctx

      const pageNum = ref(props.currentPage)
      const pageSize = ref(props.pageSize)

      const getBindValue = computed(() => {
        return { ...attrs, ...props }
      })

      const onSizeChange = (val: number) => {
        emit('change', { pageNum: pageNum.value, pageSize: val })
        emit('update:pageSize', val)
        pageSize.value = val
      }

      const onCurrentChange = (val: number) => {
        emit('change', { pageNum: val, pageSize: pageSize.value })
        emit('update:currentPage', val)
        pageNum.value = val
      }

      return {
        getBindValue,
        onSizeChange,
        onCurrentChange,
      }
    },
  })
</script>

<style lang="scss" scoped></style>
