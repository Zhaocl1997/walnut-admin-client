<script lang="tsx">
  import type { SetupContext } from 'vue'
  import { defineComponent } from 'vue'

  export default defineComponent({
    name: 'WTableExtendSettingsColumns',

    inheritAttrs: false,

    components: {},

    props: {},

    emits: [],

    setup(props: any, ctx: SetupContext) {
      const renderContent = () => {
        return (
          <>
            <w-icon
              icon="ant-design:setting-outlined"
              height="20"
              class="cursor-pointer"
            ></w-icon>
          </>
        )
      }
    },
  })
</script>

<style lang="scss" scoped></style>
