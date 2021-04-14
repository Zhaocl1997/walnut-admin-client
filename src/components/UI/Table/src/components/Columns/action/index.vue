<template>
  <el-table-column
    v-if="hasAction"
    key="action"
    :label="t('component.table.operation')"
    min-width="150"
    align="center"
    fixed="right"
  >
    <template #default="scoped">
      <slot v-bind="scoped" />
    </template>
  </el-table-column>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { useTableContext } from '../../../hooks/useTableContext'
  import { useI18n } from '/@/locales'

  export default defineComponent({
    name: 'WTableColumnAction',

    inheritAttrs: false,

    setup() {
      const { t } = useI18n()
      const { getTableContext } = useTableContext()
      const { hasAction } = getTableContext()

      return {
        t,
        hasAction,
      }
    },
  })
</script>

<style lang="scss" scoped></style>
