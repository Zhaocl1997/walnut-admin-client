<script lang="tsx">
  import { defineComponent } from 'vue'

  export default defineComponent({
    name: 'WTableExtendStateEmpty',

    inheritAttrs: false,

    components: {},

    props: {},

    emits: [],

    setup(props: any, ctx) {
      return () => {
        return <el-empty></el-empty>
      }
    },
  })
</script>
