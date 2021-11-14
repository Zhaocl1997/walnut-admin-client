<template>
  <div>
    Dashboard
    <n-input v-model:value="value"></n-input>
  </div>
</template>

<script lang="ts">
  export default defineComponent({
    name: 'Dashboard',

    inheritAttrs: false,

    props: {},

    emits: [],

    setup(props: any, ctx) {
      return {
        value: ref(''),
      }
    },
  })
</script>

<style lang="scss" scoped></style>
