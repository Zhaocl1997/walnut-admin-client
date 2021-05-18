<script lang="tsx">
  import type { PropType } from 'vue'
  import type { WTable } from '/@/components/UI/Table'

  import { defineComponent, computed } from 'vue'
  import { isArray } from 'easy-fns-ts'

  import { useTableColumnComponents } from './hooks/useTableColumnComponents'
  import { useTableColumn } from './hooks/useTableColumn'

  export default defineComponent({
    name: 'WTableItem',

    inheritAttrs: false,

    props: {
      item: Object as PropType<WTable.Header.Item.Props>,
    },

    setup(props, ctx) {
      // dynamic component
      useTableColumnComponents()

      // get render function, include nested and common columns
      const { renderNotNestedColumns, renderNestedColumns } = useTableColumn(
        props,
        ctx
      )

      // make sure item has children as an array
      // alse make sure not empty one
      // finally make sure each item in children is visible
      // otherwise just render not nested column
      const getCanRenderNested = computed(
        () =>
          isArray((props.item as WTable.Header.Item.Default)?.children) &&
          (props.item as WTable.Header.Item.Default)?.children?.length !== 0 &&
          (props.item as WTable.Header.Item.Default)?.children?.some(
            (i) => i.visible
          )
      )

      // render columns
      const renderColumns = () =>
        getCanRenderNested.value
          ? renderNestedColumns()
          : renderNotNestedColumns()

      return () => props.item?.visible && renderColumns()
    },
  })
</script>
