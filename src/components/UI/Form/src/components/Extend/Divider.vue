<script lang="tsx">
  import type { PropType } from 'vue'
  import type { WForm } from '/@/components/UI/Form'

  import { defineComponent, onMounted } from 'vue'
  import { isUndefined } from 'easy-fns-ts'

  import WTitle from '/@/components/Help/Title'
  import WArrow from '/@/components/Help/Arrow'

  import { useFormContext } from '../../hooks/useFormContext'
  import { getBoolean } from '../../utils'

  export default defineComponent({
    name: 'WFormItemExtendDivider',

    inheritAttrs: false,

    components: {
      WTitle,
      WArrow,
    },

    props: {
      item: Object as PropType<WForm.Schema.DividerSchema<any>>,
      index: Number as PropType<number>,
    },

    setup(props, ctx) {
      const { item } = props

      const { formSchemas } = useFormContext()

      const onChildren = () => {
        // not foldable, do not excute the code below
        if (!formSchemas.value[props.index!].componentProp.foldable) {
          return
        }

        const countToFold =
          formSchemas.value[props.index!].componentProp.countToFold

        // handle count to fold
        if (!isUndefined(countToFold) && countToFold !== 0) {
          const len =
            formSchemas.value[props.index!].componentProp.children.length

          for (let i = countToFold; i < len; i++) {
            formSchemas.value[props.index!].componentProp.children[
              i
            ].foldShow = !getBoolean(
              formSchemas.value[props.index!].componentProp.children[i].foldShow
            )
          }
        }

        // handle foldShow
        formSchemas.value[props.index!].componentProp.children.map(
          (child: WForm.Schema.Item) => {
            child.foldShow = !getBoolean(child.foldShow)
          }
        )
      }

      const onClick = () => {
        // set fold reverse
        formSchemas.value[props.index!].componentProp.fold = !formSchemas.value[
          props.index!
        ].componentProp.fold

        onChildren()
      }

      onMounted(() => {
        onChildren()
      })

      return () => (
        <el-divider content-position="left">
          {item?.componentProp?.title && (
            <el-space size="mini">
              <w-title show-left>{item?.componentProp?.title}</w-title>

              {item?.componentProp?.foldable && (
                <w-arrow
                  active={!item?.componentProp?.fold}
                  width="16"
                  onClick={onClick}
                ></w-arrow>
              )}
            </el-space>
          )}
        </el-divider>
      )
    },
  })
</script>
