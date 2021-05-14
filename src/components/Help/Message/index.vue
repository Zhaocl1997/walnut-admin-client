<script lang="tsx">
  import { PropType, renderSlot } from 'vue'
  import { easyOmit } from 'easy-fns-ts'
  import { unref, computed, defineComponent } from 'vue'

  export default defineComponent({
    name: 'WMessage',

    props: {
      icon: {
        type: String as PropType<string>,
        default: 'el-icon-question',
      },
    },

    setup(props, { slots }) {
      const getBindValue = computed(() => easyOmit(unref(props), 'icon'))

      return () => (
        <el-tooltip {...getBindValue.value}>
          {{
            default: () => {
              return slots.icon ? (
                <div style="margin-top: 3px">{renderSlot(slots, 'icon')}</div>
              ) : (
                <i class={props.icon}></i>
              )
            },
            content: () => {
              return renderSlot(slots, 'content')
            },
          }}
        </el-tooltip>
      )
    },
  })
</script>
