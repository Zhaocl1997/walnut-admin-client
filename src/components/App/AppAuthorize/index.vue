<script lang="ts">
  import { renderSlot } from 'vue'

  export default defineComponent({
    name: 'AppAuthorize',

    props: {
      value: String as PropType<string>,
    },

    setup(props, { slots }) {
      const { menu } = useAppState()
      const permissions = menu.value.permissions

      const render = () => {
        if (permissions.includes(props.value!)) {
          return renderSlot(slots, 'default')
        }
        return null
      }

      return () => render()
    },
  })
</script>
