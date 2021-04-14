<template>
  <el-table-column
    v-if="hasExpand"
    key="expand"
    type="expand"
    width="50"
    align="center"
    fixed="left"
  >
    <template #default="scope">
      <slot name="expand" v-bind="scope" />
    </template>
  </el-table-column>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { useTableContext } from '../../../hooks/useTableContext'

  export default defineComponent({
    name: 'WTableColumnExpand',

    inheritAttrs: false,

    setup() {
      const { getTableContext } = useTableContext()
      const { hasExpand } = getTableContext()

      return {
        hasExpand,
      }
    },
  })
</script>

<style lang="scss" scoped></style>
