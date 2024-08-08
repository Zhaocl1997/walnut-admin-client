<script lang="ts" setup>
import { getTreeData } from '../data'

defineOptions({
  name: 'SelectTreeDemo',
  defaultView: false,
})

const state = ref({
  selectTree1: '9',
  selectTree2: [10, 17],

  data: getTreeData(),

  props: {
    id: '_id',
    label: '_label',
  },
})
</script>

<template>
  <w-demo-card title="Select Tree">
    <!-- <w-title show-left>Single 【{{ selectTree1 }}】 </w-title>
    <w-select-tree
      v-model="selectTree1"
      :data="data"
      :props="props"
      clearable
    />

    <br />
    <br />

    <w-title show-left>Multiple 【{{ selectTree2 }}】 </w-title>
    <w-select-tree
      v-model="selectTree2"
      multiple
      :data="data"
      :props="props"
      clearable
      accordion
    />

    <br />
    <br /> -->
  </w-demo-card>
</template>
