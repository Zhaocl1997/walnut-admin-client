<template>
  <div>
    Homepage

    <pre>{{ app }}</pre>

    <n-switch v-model:value="app.isDark"></n-switch>
    <n-button @click="() => (token = '')">Clear Token</n-button>
  </div>
</template>

<script lang="ts">
  export default defineComponent({
    name: 'Homepage',

    inheritAttrs: false,

    props: {},

    emits: [],

    setup(props, ctx) {
      const { app, token } = useAppState()

      return { app, token }
    },
  })
</script>

<style lang="scss" scoped></style>
