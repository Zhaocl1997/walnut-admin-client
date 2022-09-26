<template>
  <w-demo-card title="Tree">
    <w-JSON :value="state" height="300px"></w-JSON>

    <n-list>
      <n-list-item>
        <n-grid :cols="2">
          <n-gi>
            <w-title prefix="bar">Single </w-title>

            <w-tree v-model:value="state.tree1" @hook="register1"></w-tree>
          </n-gi>

          <n-gi>
            <w-title prefix="bar">Single Feedback </w-title>

            <w-tree v-model:value="state.tree2" @hook="register2"></w-tree>
          </n-gi>
        </n-grid>
      </n-list-item>

      <n-list-item>
        <n-grid :cols="2">
          <n-gi>
            <w-title
              prefix="bar"
              help-message="Parent and children nodes are independent"
              >Multiple (normal)
            </w-title>

            <w-tree v-model:value="state.tree3" @hook="register3"></w-tree>
          </n-gi>

          <n-gi>
            <w-title prefix="bar">Multiple Feedback (normal)</w-title>

            <w-tree v-model:value="state.tree4" @hook="register4"></w-tree>
          </n-gi>
        </n-grid>
      </n-list-item>

      <n-list-item>
        <n-grid :cols="2">
          <n-gi>
            <w-title
              prefix="bar"
              help-message="Parent and children nodes are connected \n But Half checked do not emit as v-model:value"
              >Multiple (cascade)
            </w-title>

            <w-tree v-model:value="state.tree5" @hook="register5"></w-tree>
          </n-gi>

          <n-gi>
            <w-title prefix="bar">Multiple Feedback (cascade)</w-title>

            <w-tree v-model:value="state.tree6" @hook="register6"></w-tree>
          </n-gi>
        </n-grid>
      </n-list-item>

      <n-list-item>
        <n-grid :cols="2">
          <n-gi>
            <w-title prefix="bar">Preset Toolbar</w-title>

            <w-tree v-model:value="state.tree7" @hook="register7"></w-tree>
          </n-gi>

          <n-gi>
            <w-title prefix="bar">Preset Toolbar (with multiple)</w-title>

            <w-tree v-model:value="state.tree8" @hook="register8"></w-tree>
          </n-gi>
        </n-grid>
      </n-list-item>

      <n-list-item>
        <n-grid :cols="2">
          <n-gi>
            <w-title prefix="bar">Draggable (with icon)</w-title>

            <w-tree v-model:value="state.tree9" @hook="register9"></w-tree>
          </n-gi>

          <n-gi>
            <w-title prefix="bar">Delete (with icon)</w-title>

            <w-tree v-model:value="state.tree10" @hook="register10"></w-tree>
          </n-gi>
        </n-grid>
      </n-list-item>

      <n-list-item>
        <n-grid :cols="2">
          <n-gi>
            <w-title prefix="bar">Preset prefix icon (with icon field)</w-title>

            <w-tree v-model:value="state.tree11" @hook="register11"></w-tree>
          </n-gi>

          <n-gi>
            <w-title prefix="bar">Context menu</w-title>

            <w-tree v-model:value="state.tree12" @hook="register12"></w-tree>
          </n-gi>
        </n-grid>
      </n-list-item>
    </n-list>
  </w-demo-card>
</template>

<script lang="ts" setup>
  import { getTreeData } from '../data'
  import { useTree } from '@/components/UI/Tree'

  const state = ref({
    tree1: undefined,
    tree2: 1,
    tree3: undefined,
    tree4: [1, 2, 3],
    tree5: undefined,
    tree6: [9, 13],
    tree7: undefined,
    tree8: undefined,
    tree9: undefined,
    tree10: undefined,
    tree11: undefined,
    tree12: undefined,
  })

  const [register1] = useTree({
    treeProps: {
      data: getTreeData(),
      labelField: '_label',
      keyField: '_id',
      blockLine: true,
      blockNode: true,
    },
  })

  const [register2] = useTree({
    treeProps: {
      data: getTreeData(),
      labelField: '_label',
      keyField: '_id',
      blockLine: true,
      blockNode: true,
    },
  })

  const [register3] = useTree({
    multiple: true,
    treeProps: {
      data: getTreeData(),
      labelField: '_label',
      keyField: '_id',
      blockLine: true,
      blockNode: true,
    },
  })

  const [register4] = useTree({
    multiple: true,
    treeProps: {
      data: getTreeData(),
      labelField: '_label',
      keyField: '_id',
      blockLine: true,
      blockNode: true,
    },
  })

  const [register5] = useTree({
    multiple: true,
    treeProps: {
      data: getTreeData(),
      labelField: '_label',
      keyField: '_id',
      blockLine: true,
      blockNode: true,
      cascade: true,
    },
  })

  const [register6] = useTree({
    multiple: true,
    treeProps: {
      data: getTreeData(),
      labelField: '_label',
      keyField: '_id',
      blockLine: true,
      blockNode: true,
      cascade: true,
    },
  })

  const [register7] = useTree({
    toolbar: true,
    treeProps: {
      data: getTreeData(),
      labelField: '_label',
      keyField: '_id',
      blockLine: true,
      blockNode: true,
      cascade: true,
    },
  })

  const [register8] = useTree({
    toolbar: true,
    multiple: true,
    treeProps: {
      data: getTreeData(),
      labelField: '_label',
      keyField: '_id',
      blockLine: true,
      blockNode: true,
    },
  })

  const [register9] = useTree({
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

  const [register10] = useTree({
    deletable: true,
    onTreeNodeItemDelete(option) {
      console.log('deleted', option)
    },
    treeProps: {
      data: getTreeData(),
      labelField: '_label',
      keyField: '_id',
      blockLine: true,
      blockNode: true,
      cascade: true,
    },
  })

  const [register11] = useTree({
    presetPrefixIcon: true,
    treeProps: {
      data: getTreeData(),
      labelField: '_label',
      keyField: '_id',
      blockLine: true,
      blockNode: true,
      cascade: true,
    },
  })

  const [register12] = useTree({
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
    },
  })
</script>

<script lang="ts">
  export default defineComponent({
    name: 'DemoTree',

    defaultView: false,
  })
</script>
