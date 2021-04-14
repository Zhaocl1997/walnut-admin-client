<template>
  <el-tree ref="elTreeRef" v-bind="getBindValue"></el-tree>
</template>

<script lang="ts">
  import type { SetupContext } from 'vue'
  import type { WTreeProps, ElTreeRef } from './types'

  import { ref, computed, defineComponent } from 'vue'

  import { useExpose } from '/@/hooks/core/useExpose'

  import props from './props'

  import { useTreeCore } from './hooks/useTreeCore'
  import { useTreeProps } from './hooks/useTreeProps'
  import { useTreeSingle } from './hooks/useTreeSingle'
  import { useTreeMultiple } from './hooks/useTreeMultiple'
  import { useTreeFeedback } from './hooks/useTreeFeedback'
  import { useTreeMethods } from './hooks/useTreeMethods'

  export default defineComponent({
    name: 'WTree',

    inheritAttrs: false,

    props: props,

    emits: ['update:modelValue', 'node-click', 'check'],

    setup(props: WTreeProps, ctx: SetupContext) {
      const { attrs, emit, expose } = ctx

      const elTreeRef = ref<Nullable<ElTreeRef>>(null)

      const {
        getProps,
        getNodeKey,
        getShowCheckbox,
        getDefaultExpandKeys,
      } = useTreeProps(props)

      const { onNodeClick } = useTreeSingle(props, emit, getNodeKey)

      const { onGetCheckedNodes } = useTreeCore(props, elTreeRef, getNodeKey)

      const { onCheck } = useTreeMultiple(props, emit, onGetCheckedNodes)

      const { treeMethods } = useTreeMethods(
        elTreeRef,
        props,
        emit,
        onGetCheckedNodes
      )

      // v-model feedback
      useTreeFeedback(props, elTreeRef, getNodeKey)

      // expose to outside
      useExpose({
        apis: treeMethods,
        expose: expose,
      })

      // bind value
      const getBindValue = computed(() => {
        return {
          ...attrs,
          ...props,
          nodeKey: getNodeKey.value,
          onNodeClick,
          onCheck,
          showCheckbox: getShowCheckbox.value,
          defaultExpandedKeys: getDefaultExpandKeys.value,
        }
      })

      return {
        elTreeRef,
        getBindValue,
      }
    },
  })
</script>

<style lang="scss" scoped></style>
