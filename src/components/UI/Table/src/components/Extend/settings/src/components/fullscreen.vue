<script lang="tsx">
  import { defineComponent } from 'vue'

  import AppFullScreen from '/@/components/App/AppFullScreen'

  import { useTableContext } from '/@/components/UI/Table/src/hooks/useTableContext'

  export default defineComponent({
    name: 'WTableExtendSettingsFullScreen',

    inheritAttrs: false,

    components: { AppFullScreen },

    setup(props, ctx) {
      const { tableId } = useTableContext()

      return () => <AppFullScreen target={`#${tableId}`} width="20px" />
    },
  })
</script>
