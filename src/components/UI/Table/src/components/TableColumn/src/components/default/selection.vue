<script lang="tsx">
  import type { PropType } from 'vue'
  import type { WTable } from '/@/components/UI/Table'

  import { defineComponent } from 'vue'

  export default defineComponent({
    name: 'WTableColumnSelect',

    inheritAttrs: false,

    props: {
      column: Object as PropType<WTable.Header.Default.Selection>,
    },

    setup(props) {
      return () => <el-table-column {...props.column}></el-table-column>
    },
  })
</script>
