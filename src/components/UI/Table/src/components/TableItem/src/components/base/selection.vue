<script lang="tsx">
  import type { SelectColumn } from '/@/components/UI/Table'
  import type { PropType } from 'vue'

  import { defineComponent } from 'vue'

  export default defineComponent({
    name: 'WTableColumnSelect',

    inheritAttrs: false,

    props: {
      column: Object as PropType<SelectColumn>,
    },

    setup(props) {
      return () => <el-table-column {...props.column}></el-table-column>
    },
  })
</script>
