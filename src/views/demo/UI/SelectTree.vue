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
  <WDemoCard title="Select Tree">
    <!-- <WTitle show-left>Single 【{{ selectTree1 }}】 </WTitle>
    <WSelect-tree
      v-model="selectTree1"
      :data="data"
      :props="props"
      clearable
    />

    <br />
    <br />

    <WTitle show-left>Multiple 【{{ selectTree2 }}】 </WTitle>
    <WSelect-tree
      v-model="selectTree2"
      multiple
      :data="data"
      :props="props"
      clearable
      accordion
    />

    <br />
    <br /> -->
  </WDemoCard>
</template>
