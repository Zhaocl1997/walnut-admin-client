<script lang="tsx">
  import type { PropType } from 'vue'
  import type { WTable } from '/@/components/UI/Table'

  import { defineComponent, renderSlot } from 'vue'
  import { easyOmit } from 'easy-fns-ts'

  export default defineComponent({
    name: 'WTableColumnExpand',

    inheritAttrs: false,

    props: {
      column: Object as PropType<WTable.Header.Default.Expand>,
    },

    setup(props, ctx) {
      const { slots } = ctx

      // render expand slot
      const renderDefaultSlot = () => ({
        default: (scope: WTable.ScopeSlotData) =>
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
