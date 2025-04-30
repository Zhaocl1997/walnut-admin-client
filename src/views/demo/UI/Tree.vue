<script lang="ts" setup>
import { useTree } from '@/components/UI/Tree'
import { getTreeData } from '../data'

defineOptions({
  name: 'DemoTree',
  defaultView: false,
})

const state = ref({
  tree1: undefined,
  tree2: undefined,
})

setTimeout(() => {
  state.value.tree1 = 9
  state.value.tree2 = [1, 4, 9, 11, 12]
}, 2000)

const [register1] = useTree({
  toolbar: true,

  deletable: true,
  onTreeNodeItemDelete(option) {
    console.log('DemoTree', option)
  },

  maxHeight: '300px',

  treeProps: {
    data: getTreeData(),
    labelField: '_label',
    keyField: '_id',
    blockLine: true,
    blockNode: true,
    showLine: true,
    defaultExpandAll: true,
    showIrrelevantNodes: false,
  },
})

const [register2] = useTree({
  multiple: true,
  toolbar: true,
  presetPrefixIcon: true,

  deletable: true,
  onTreeNodeItemDelete(option) {
    console.log('DemoTree', option)
  },

  presetContextMenu: true,
  onPaste: (copy, current) => {
    console.log('DemoTree', { copy, current })
  },

  treeProps: {
    data: getTreeData(),
    labelField: '_label',
    keyField: '_id',
    blockLine: true,
    blockNode: true,
    cascade: true,
    draggable: true,
    onDrop: ({ node, dragNode, dropPosition }) => {
      console.log('DemoTree', { node, dragNode, dropPosition })
    },
  },
})
</script>

<template>
  <WDemoCard title="Tree">
    <WJSON :value="state" height="300px" />

    <n-list>
      <n-list-item>
        <n-grid :cols="2">
          <n-gi>
            <WTitle prefix="bar" class="mb-2">
              Single Choose Tree
            </WTitle>

            <WTree v-model:value="state.tree1" @hook="register1" />
          </n-gi>
          <n-gi>
            <WTitle prefix="bar" class="mb-2">
              Multiple Choose Tree
            </WTitle>

            <WTree v-model:value="state.tree2" @hook="register2" />
          </n-gi>
        </n-grid>
      </n-list-item>
    </n-list>
  </WDemoCard>
</template>
