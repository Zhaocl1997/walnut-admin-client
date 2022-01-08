<template>
  <div>
    Homepage

    <WAppAuthorize value="system:user:create">
      <div class="bg-red-800">test authorize</div>
    </WAppAuthorize>
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

      return {}
    },
  })
</script>

<style lang="scss" scoped></style>
