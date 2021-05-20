<script lang="tsx">
  import { defineComponent } from 'vue'

  export default defineComponent({
    name: 'WTableExtendStateLoading',

    inheritAttrs: false,

    components: {},

    props: {},

    emits: [],

    setup(props: any, ctx) {
      return () => {
        return <div>Loading</div>
      }
    },
  })
</script>
