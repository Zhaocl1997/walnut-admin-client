<template>
  <div>
    Index

    <div v-for="item in 10">
      <TestComp></TestComp>
    </div>
  </div>
</template>

<script lang="ts">
  import type { SetupContext } from 'vue'
  import { defineComponent } from 'vue'
  import TestComp from './testComp.vue'

  export default defineComponent({
    name: 'Index',

    inheritAttrs: false,

    defaultView: false,

    components: { TestComp },

    props: {},

    emits: [],

    setup(props: any, ctx: SetupContext) {},
  })
</script>

<style lang="scss" scoped></style>
