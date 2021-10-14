<script lang="ts">
  import { useLoadingBar } from 'naive-ui'

  export default defineComponent({
    name: 'MsgProvider',

    setup(_, { slots }) {
      window.$loadingBar = useLoadingBar()

      return () => slots.default?.()
    },
  })
</script>
