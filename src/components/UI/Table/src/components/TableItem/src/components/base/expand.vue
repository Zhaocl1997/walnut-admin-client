<script lang="tsx">
  import type {
    ElTableColumnScopedSlot,
    ExpandColumn,
  } from '/@/components/UI/Table'
  import type { PropType } from 'vue'

  import { defineComponent, renderSlot } from 'vue'

  export default defineComponent({
    name: 'WTableColumnExpand',

    inheritAttrs: false,

    props: {
      column: Object as PropType<ExpandColumn>,
    },

    setup(props, ctx) {
      const { slots } = ctx

      // render expand slot
      const renderDefaultSlot = () => ({
        default: (scope: ElTableColumnScopedSlot) =>
          renderSlot(slots, 'default', scope),
      })

      return () => (
        <el-table-column {...props.column}>
          {renderDefaultSlot()}
        </el-table-column>
      )
    },
  })
</script>

<style lang="scss" scoped></style>
