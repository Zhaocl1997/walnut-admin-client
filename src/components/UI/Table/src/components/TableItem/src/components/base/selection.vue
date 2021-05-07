<script lang="tsx">
  import type { WTableEditableColumnDefaultSelect } from '/@/components/UI/Table'
  import type { PropType } from 'vue'

  import { defineComponent } from 'vue'

  export default defineComponent({
    name: 'WTableColumnSelect',

    inheritAttrs: false,

    props: {
      column: Object as PropType<WTableEditableColumnDefaultSelect>,
    },

    setup(props) {
      return () => <el-table-column {...props.column}></el-table-column>
    },
  })
</script>
