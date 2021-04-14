<template>
  <el-select
    ref="elSelectRef"
    v-model="selectValue"
    v-bind="getSelectBindValue"
  >
    <el-option :value="optionValue" class="w-select-tree-option">
      <WTree
        ref="wTreeRef"
        v-model="treeValue"
        v-bind="getTreeBindValue"
      ></WTree>
    </el-option>
  </el-select>
</template>

<script lang="ts">
  import type { SetupContext } from 'vue'
  import { defineComponent } from 'vue'

  import props from './props'

  import { useSelectTreeState } from './hooks/useSelectTreeState'
  import { useSelectTreeProps } from './hooks/useSelectTreeProps'
  import { useSelectTreeBindValue } from './hooks/useSelectTreeBindValue'
  import { useSelectTreeSingle } from './hooks/useSelectTreeSingle'
  import { useSelectTreeMultiple } from './hooks/useSelectTreeMultiple'
  import { useSelectTreeFeedback } from './hooks/useSelectTreeFeedback'

  export default defineComponent({
    name: 'WSelectTree',

    inheritAttrs: false,

    props: props,

    emits: ['update:modelValue', 'change'],

    setup(props: any, ctx: SetupContext) {
      const { attrs, emit } = ctx

      // state
      const {
        selectValue,
        optionValue,
        treeValue,
        wTreeRef,
        elSelectRef,
      } = useSelectTreeState()

      // props
      const { getProps, nodeKey, label, children } = useSelectTreeProps(props)

      // single handler
      const { onNodeClick } = useSelectTreeSingle(props, {
        elSelectRef,
        selectValue,
        treeValue,
        label,
        emit,
      })

      // multiple handler
      const { onSelectChange, onCheckChange } = useSelectTreeMultiple(props, {
        selectValue,
        optionValue,
        treeValue,
        wTreeRef,
        emit,
        label,
        nodeKey,
      })

      // feedback handler
      useSelectTreeFeedback(props, {
        selectValue,
        optionValue,
        treeValue,
        nodeKey,
        label,
        children,
      })

      // bind value handler
      const { getSelectBindValue, getTreeBindValue } = useSelectTreeBindValue(
        props,
        {
          onSelectChange,

          getProps,
          onNodeClick,
          onCheckChange,
        }
      )

      return {
        getSelectBindValue,
        getTreeBindValue,

        selectValue,
        optionValue,
        treeValue,
        wTreeRef,
        elSelectRef,
      }
    },
  })
</script>

<style lang="scss" scoped>
  .w-select-tree-option {
    max-height: 200px;
    overflow-y: auto;
  }

  .el-select-dropdown__item.hover,
  .el-select-dropdown__item:hover {
    background-color: #fff;
  }
</style>
