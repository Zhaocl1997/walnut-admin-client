<script lang="ts">
  import { renderSlot } from 'vue'

  export default defineComponent({
    name: 'AppAuthorize',

    props: {
      value: String as PropType<string>,
    },

    setup(props, { slots }) {
      const { hasPermission } = usePermissions()

      const render = () => {
        if (hasPermission(props.value!)) {
          return renderSlot(slots, 'default')
        }
        return null
      }

      return () => render()
    },
  })
</script>
