<template>
  <w-demo-card title="Tree">
    <w-title prefix="bar">Basic Tree </w-title>

    <w-tree @hook="register"></w-tree>
  </w-demo-card>
</template>

<script lang="ts" setup>
  import { getTreeData } from '../data'
  import { useTree } from '/@/components/UI/Tree/src/hook/useTree'

  const [register] = useTree({
    treeProps: {
      data: getTreeData(),
      labelField: '_label',
      keyField: '_id',
    },
  })
</script>

<script lang="ts">
  export default defineComponent({
    name: 'DemoTree',

    defaultView: false,
  })
</script>
