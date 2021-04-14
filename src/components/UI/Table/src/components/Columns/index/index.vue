<template>
  <el-table-column
    v-if="hasIndex"
    key="index"
    :label="t('component.table.index')"
    type="index"
    width="80"
    align="center"
    fixed="left"
    :index="index"
  >
    <template #default="{ $index }">
      <span>{{ (pageNum - 1) * pageSize + $index + 1 }}</span>
    </template>
  </el-table-column>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { useTableContext } from '../../../hooks/useTableContext'
  import { useI18n } from '/@/locales'

  export default defineComponent({
    name: 'WTableColumnIndex',

    inheritAttrs: false,

    setup() {
      const { t } = useI18n()
      const { getTableContext } = useTableContext()
      const { hasIndex, index, pageNum, pageSize } = getTableContext()

      return {
        t,
        hasIndex,
        index,
        pageNum,
        pageSize,
      }
    },
  })
</script>

<style lang="scss" scoped></style>
