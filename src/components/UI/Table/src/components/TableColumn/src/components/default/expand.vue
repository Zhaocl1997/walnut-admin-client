<script lang="tsx">
  import type {
    ElTableColumnScopedSlot,
    WTableEditableColumnDefaultExpand,
  } from '/@/components/UI/Table'
  import type { PropType } from 'vue'

  import { defineComponent, renderSlot } from 'vue'
  import { easyOmit } from 'easy-fns-ts'

  export default defineComponent({
    name: 'WTableColumnExpand',

    inheritAttrs: false,

    props: {
      column: Object as PropType<WTableEditableColumnDefaultExpand>,
    },

    setup(props, ctx) {
      const { slots } = ctx

      // render expand slot
      const renderDefaultSlot = () => ({
        default: (scope: ElTableColumnScopedSlot) =>
          renderSlot(slots, 'default', scope),
      })

      return () => (
        <el-table-column {...easyOmit(props.column, 'label')}>
          {renderDefaultSlot()}
        </el-table-column>
      )
    },
  })
</script>

<style lang="scss" scoped></style>
