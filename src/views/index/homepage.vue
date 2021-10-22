<template>
  <div>
    Homepage

    <pre>{{ app }}</pre>

    <n-switch v-model:value="app.isDark"></n-switch>
  </div>
</template>

<script lang="ts">
  export default defineComponent({
    name: 'Homepage',

    inheritAttrs: false,

    props: {},

    emits: [],

    setup(props, ctx) {
      const { app } = useAppState()

      return { app }
    },
  })
</script>

<style lang="scss" scoped></style>
