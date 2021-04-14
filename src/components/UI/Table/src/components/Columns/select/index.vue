<template>
  <el-table-column
    v-if="hasSelect"
    key="select"
    type="selection"
    width="50"
    align="center"
    fixed="left"
    :selectable="selectable"
    :reserve-selection="reserveSelection"
  />
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { useTableContext } from '../../../hooks/useTableContext'

  export default defineComponent({
    name: 'WTableColumnSelect',

    inheritAttrs: false,

    setup() {
      const { getTableContext } = useTableContext()
      const { hasSelect, selectable, reserveSelection } = getTableContext()

      return {
        hasSelect,
        selectable,
        reserveSelection,
      }
    },
  })
</script>

<style lang="scss" scoped></style>
