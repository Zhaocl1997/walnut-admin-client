<script lang="tsx">
  import type { PropType } from 'vue'

  import { defineComponent, onMounted } from 'vue'
  import { isUndefined } from 'easy-fns-ts'

  import type { WForm } from '/@/components/UI/Form'
  import WTitle from '/@/components/Help/Title'
  import WArrow from '/@/components/Help/Arrow'
  import { useFormContext } from '../../hooks/useFormContext'

  export default defineComponent({
    name: 'WFormExtendDivider',

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
        const countToFold =
          formSchemas.value[props.index!].componentProp.countToFold

        // handle count to fold
        if (!isUndefined(countToFold) && countToFold !== 0) {
          const len =
            formSchemas.value[props.index!].componentProp.children.length

          console.log(countToFold, len)

          for (let i = countToFold; i < len; i++) {
            if (
              isUndefined(
                formSchemas.value[props.index!].componentProp.children[i].vShow
              )
            ) {
              formSchemas.value[props.index!].componentProp.children[
                i
              ].vShow = true
            }

            formSchemas.value[props.index!].componentProp.children[
              i
            ].vShow = !formSchemas.value[props.index!].componentProp.children[i]
              .vShow
          }
        }

        // handle vShow
        formSchemas.value[props.index!].componentProp.children.map(
          (child: WForm.Schema.Item) => {
            if (isUndefined(child.vShow)) {
              child.vShow = true
            }
            child.vShow = !child.vShow
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

      return () => {
        return (
          <el-divider content-position="left">
            <el-space size="mini">
              <w-title show-left>{item?.componentProp?.title}</w-title>
              <w-arrow
                active={!item?.componentProp?.fold}
                width="16"
                onClick={onClick}
              ></w-arrow>
            </el-space>
          </el-divider>
        )
      }
    },
  })
</script>
