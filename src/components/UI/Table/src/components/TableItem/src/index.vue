<script lang="tsx">
  import type { PropType } from 'vue'
  import type { WTableHeaderItem } from '/@/components/UI/Table'

  import { defineComponent } from 'vue'
  import { isArray } from 'easy-fns-ts'

  import { useTableColumnComponents } from './hooks/useTableColumnComponents'
  import { useTableColumn } from './hooks/useTableColumn'

  export default defineComponent({
    name: 'WTableItem',

    inheritAttrs: false,

    props: {
      item: Object as PropType<WTableHeaderItem>,
    },

    setup(props, ctx) {
      // dynamic component
      useTableColumnComponents()

      const { renderNotNestedColumns, renderNestedColumns } = useTableColumn(
        props,
        ctx
      )

      // render columns
      const renderColumns = () =>
        isArray(props.item!.children)
          ? renderNestedColumns()
          : props.item?.visible !== false && renderNotNestedColumns()

      return () => renderColumns()
    },
  })
</script>
