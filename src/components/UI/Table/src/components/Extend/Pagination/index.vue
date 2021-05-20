<script lang="tsx">
  import type { WTable } from '/@/components/UI/Table'

  import { defineComponent } from 'vue'
  import { useTableContext } from '/@/components/UI/Table/src/hooks/useTableContext'

  export default defineComponent({
    name: 'WTableExtendPagination',

    inheritAttrs: false,

    setup() {
      const { tableEvent, tablePageState } = useTableContext()

      const onPageChange = (val: WTable.Params.Page) => {
        tableEvent({
          eventName: 'page',
          eventParams: {
            pageNum: val.pageNum,
            pageSize: val.pageSize,
          },
        })
      }

      return () => {
        return (
          <w-pagination
            {...tablePageState}
            onChange={onPageChange}
            class="mt-4 flex justify-end"
          ></w-pagination>
        )
      }
    },
  })
</script>
