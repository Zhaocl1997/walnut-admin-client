<script lang="tsx">
  import { defineComponent } from 'vue'
  import WTableExtendSettingsRefresh from './components/refresh.vue'
  import WTableExtendSettingsFullScreen from './components/fullscreen.vue'
  import WTableExtendSettingsColumns from './components/column.vue'

  export default defineComponent({
    name: 'WTableExtendSettings',

    inheritAttrs: false,

    components: {
      WTableExtendSettingsRefresh,
      WTableExtendSettingsFullScreen,
      WTableExtendSettingsColumns,
    },

    props: {},

    emits: [],

    setup(props: any, ctx) {
      return () => (
        <>
          <WTableExtendSettingsRefresh />
          <WTableExtendSettingsFullScreen />
          <WTableExtendSettingsColumns />
        </>
      )
    },
  })
</script>
