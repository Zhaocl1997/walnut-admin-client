<script lang="tsx">
  import type {
    SwitchColumn,
    ElTableColumnScopedSlot,
  } from '/@/components/UI/Table'
  import type { PropType } from 'vue'

  import { defineComponent } from 'vue'

  export default defineComponent({
    name: 'WTableColumnSwitch',

    inheritAttrs: false,

    props: {
      column: Object as PropType<SwitchColumn>,
    },

    setup(props) {
      // TODO
      // nested prop won't work
      const renderSwitch = () => ({
        default: (scope: ElTableColumnScopedSlot) => (
          <el-switch
            v-model={scope.row[props.column?.prop!]}
            beforeChange={props.column!.beforeChange}
          ></el-switch>
        ),
      })

      return () => (
        <el-table-column {...props.column}>{renderSwitch()}</el-table-column>
      )
    },
  })
</script>
