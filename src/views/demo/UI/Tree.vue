<script lang="ts" setup>
import { getTreeData } from '../data'
import { useTree } from '@/components/UI/Tree'

const state = ref({
  tree1: 1,
  tree2: [1, 4, 9, 11, 12],
})

const [register1] = useTree({
  toolbar: true,
  treeProps: {
    data: getTreeData(),
    labelField: '_label',
    keyField: '_id',
    blockLine: true,
    blockNode: true,
  },
})

const [register2] = useTree({
  multiple: true,
  toolbar: true,
  presetPrefixIcon: true,

  deletable: true,
  onTreeNodeItemDelete(option) {
    console.log('deleted', option)
  },

  presetContextMenu: true,
  onPaste: (copy, current) => {
    console.log(copy, current)
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
      console.log('dragged', node, dragNode, dropPosition)
    },
  },
})
</script>

<script lang="ts">
export default defineComponent({
  name: 'DemoTree',

  defaultView: false,
})
</script>

<template>
  <w-demo-card title="Tree">
    <w-JSON :value="state" height="300px" />

    <n-list>
      <n-list-item>
        <n-grid :cols="2">
          <n-gi>
            <w-title prefix="bar">
              Single Choose Tree
            </w-title>

            <w-tree v-model:value="state.tree1" @hook="register1" />
          </n-gi>
          <n-gi>
            <w-title prefix="bar">
              Multiple Choose Tree
            </w-title>

            <w-tree v-model:value="state.tree2" @hook="register2" />
          </n-gi>
        </n-grid>
      </n-list-item>
    </n-list>
  </w-demo-card>
</template>
