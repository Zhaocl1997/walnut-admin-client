<script lang="tsx">
  import type { WTreeProps, ElTreeRef } from './types'

  import { ref, computed, defineComponent } from 'vue'
  import { easyOmit } from 'easy-fns-ts'

  import { useExpose } from '/@/hooks/core/useExpose'
  import { useProps } from '/@/hooks/core/useProps'

  import props, { extendPropKeys } from './props'

  import { useTreeCore } from './hooks/useTreeCore'
  import { useTreeSingle } from './hooks/useTreeSingle'
  import { useTreeMultiple } from './hooks/useTreeMultiple'
  import { useTreeFeedback } from './hooks/useTreeFeedback'
  import { useTreeMethods } from './hooks/useTreeMethods'
  import { useTreeEmit } from './hooks/useTreeEmit'

  export default defineComponent({
    name: 'WTree',

    inheritAttrs: false,

    props: props,

    emits: ['update:modelValue', 'node-click', 'check', 'hook'],

    setup(props: WTreeProps, ctx) {
      const { attrs, emit, expose } = ctx

      const elTreeRef = ref<Nullable<ElTreeRef>>(null)

      const {
        emitModelValue,
        emitCheck,
        emitNodeClick,
        emitHook,
      } = useTreeEmit(emit)

      const { setProps, getProps } = useProps<WTreeProps>(props)

      const { onNodeClick } = useTreeSingle(getProps, {
        emitModelValue,
        emitNodeClick,
      })

      const { onGetCheckedNodes } = useTreeCore(getProps, elTreeRef)

      const { onCheck } = useTreeMultiple(
        getProps,
        { emitModelValue, emitCheck },
        onGetCheckedNodes
      )

      const { treeMethods } = useTreeMethods(
        getProps,
        elTreeRef,
        { emitModelValue },
        onGetCheckedNodes,
        setProps
      )

      // v-model feedback
      useTreeFeedback(getProps, elTreeRef, getProps.value.props?.id!)

      // bind value
      const getBindValue = computed(() => {
        return {
          ...attrs,
          ...easyOmit(getProps.value, extendPropKeys),
          nodeKey: getProps.value.props?.id,
          showCheckbox: getProps.value.multiple,
          defaultExpandedKeys:
            getProps.value.modelValue && getProps.value.multiple
              ? props.modelValue
              : [],
        }
      })

      // expose to outside
      useExpose({
        apis: treeMethods,
        expose: expose,
      })

      // emit hook
      emitHook(treeMethods)

      return () => (
        <el-tree
          ref={elTreeRef}
          {...getBindValue.value}
          onCheck={onCheck}
          onNodeClick={onNodeClick}
        ></el-tree>
      )
    },
  })
</script>
