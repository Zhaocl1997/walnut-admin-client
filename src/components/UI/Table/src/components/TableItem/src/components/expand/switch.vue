<script lang="tsx">
  import type {
    SwitchColumn,
    ElTableColumnScopedSlot,
  } from '/@/components/UI/Table'
  import type { PropType } from 'vue'

  import { defineComponent } from 'vue'
  import { isArray } from 'easy-fns-ts'

  const easyDeepGet = (obj, path = '', defaultValue = '') => {
    return (
      (!isArray(path)
        ? path.replace(/\[/g, '.').replace(/\]/g, '').split('.')
        : path
      ).reduce((o, k) => (o || {})[k], obj) ?? defaultValue
    )
  }

  export default defineComponent({
    name: 'WTableColumnSwitch',

    inheritAttrs: false,

    props: {
      column: Object as PropType<SwitchColumn>,
    },

    setup(props) {
      const renderSwitch = () => ({
        default: (scope: ElTableColumnScopedSlot) => {
          return (
            <el-switch
              modelValue={easyDeepGet(scope.row, props.column?.prop)}
              beforeChange={props.column!.beforeChange}
            ></el-switch>
          )
        },
      })

      return () => (
        <el-table-column {...props.column}>{renderSwitch()}</el-table-column>
      )
    },
  })
</script>
