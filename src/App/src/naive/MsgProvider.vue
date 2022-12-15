<script lang="ts">
import {
  useDialog,
  useLoadingBar,
  useMessage,
  useNotification,
} from 'naive-ui'

export default defineComponent({
  name: 'MsgProvider',

  setup(_, { slots }) {
    window.$loadingBar = useLoadingBar()
    window.$message = useMessage()
    window.$notification = useNotification()
    window.$dialog = useDialog()

    return () => slots.default?.()
  },
})
</script>
