<template>
  <el-select
    ref="elSelectRef"
    v-model="selectValue"
    v-bind="getSelectBindValue"
    @change="onSelectChange"
  >
    <el-option :value="optionValue" class="w-select-tree-option">
      <w-tree
        ref="wTreeRef"
        v-model="treeValue"
        v-bind="getTreeBindValue"
      ></w-tree>
    </el-option>
  </el-select>
</template>

<script lang="ts">
  import type { WSelectTreeProp } from './types'
  import { defineComponent } from 'vue'

  import WTree from '/@/components/UI/Tree'
  import { useSelectTreeCore } from './hooks/useSelectTreeCore'
  import { useSelectTreeBindValue } from './hooks/useSelectTreeBindValue'
  import props from './props'

  export default defineComponent({
    name: 'WSelectTree',

    inheritAttrs: false,

    components: { WTree },

    props: props,

    emits: ['update:modelValue'],

    setup(props, ctx) {
      const { emit } = ctx

      // state
      const {
        selectValue,
        optionValue,
        treeValue,
        wTreeRef,
        elSelectRef,
        onSelectChange,
      } = useSelectTreeCore(props as WSelectTreeProp, emit)

      // bind value handler
      const { getSelectBindValue, getTreeBindValue } = useSelectTreeBindValue(
        props
      )

      return {
        selectValue,
        optionValue,
        treeValue,
        wTreeRef,
        elSelectRef,
        onSelectChange,

        getSelectBindValue,
        getTreeBindValue,
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
