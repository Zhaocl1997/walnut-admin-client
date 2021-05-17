<template>
  <el-card>
    <template #header>
      <span>SelectTree：</span>
    </template>

    <w-title show-left>Single 【{{ selectTree1 }}】 </w-title>
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
    <br />
  </el-card>
</template>

<script lang="ts">
  import { defineComponent, reactive, toRefs } from 'vue'
  import { getTreeData } from '../data'

  export default defineComponent({
    name: 'SelectTreeDemo',

    setup() {
      const state = reactive({
        selectTree1: '9',
        selectTree2: [10, 17],

        data: getTreeData(),

        props: {
          id: '_id',
          label: '_label',
        },
      })

      return {
        ...toRefs(state),
      }
    },
  })
</script>

<style lang="scss" scoped></style>
