<template>
  <el-divider content-position="left">
    <el-space size="mini">
      <w-title>{{ item.title }}</w-title>
      <w-arrow
        v-if="item.fold === true || item.fold === false"
        :active="item.fold"
        @click="onToggle"
      ></w-arrow>
    </el-space>
  </el-divider>
</template>

<script lang="ts">
  import { ref, reactive, defineComponent } from 'vue'

  export default defineComponent({
    name: 'WFormDivider',

    props: {
      // TODO
      // use index for temp
      index: Number,
    },

    setup(props) {},
  })
</script>

<style lang="scss" scoped></style>
