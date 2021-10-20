<template>
  <div v-for="i in 3000" :key="i" class="inline-block">Index {{ i }} --</div>
</template>

<script lang="ts">
  export default defineComponent({
    name: 'Index',

    inheritAttrs: false,

    props: {},

    emits: [],

    setup(props: any, ctx) {
      return {}
    },
  })
</script>

<style lang="scss" scoped></style>
