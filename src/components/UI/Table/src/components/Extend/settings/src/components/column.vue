<script lang="tsx">
  import { defineComponent, nextTick } from 'vue'
  import { useDialog } from '/@/components/UI/Dialog'
  import { useTableContext } from '/@/components/UI/Table/src/hooks/useTableContext'

  export default defineComponent({
    name: 'WTableExtendSettingsColumns',

    inheritAttrs: false,

    components: {},

    props: {},

    emits: [],

    setup(props: any, ctx) {
      const [register, { openDialog, closeDialog }] = useDialog({
        title: 'Table Settings',
        width: '30%',
      })

      const { tableHeaders } = useTableContext()

      const renderSetting = () => {
        return (
          <el-tree data={tableHeaders.value} draggable>
            {{
              default: ({ node, data }: { node: any; data: any }) => (
                <>
                  <el-checkbox v-model={data.visible}></el-checkbox>
                  {data.label}
                </>
              ),
            }}
          </el-tree>
        )
      }

      const renderDialog = () => (
        <w-dialog onHook={register} onClose={closeDialog}>
          {renderSetting()}
        </w-dialog>
      )

      const renderContent = () => (
        <>
          <w-icon
            icon="ant-design:setting-outlined"
            height="20"
            class="cursor-pointer"
            onClick={openDialog}
          ></w-icon>

          {renderDialog()}
        </>
      )

      return () => renderContent()
    },
  })
</script>
