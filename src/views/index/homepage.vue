<template>
  <div>
    Homepage

    <pre>{{ app }}</pre>

    <div v-for="i in 500" :key="i">Homepage</div>
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
