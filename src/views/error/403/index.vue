<template>
  <n-result
    status="403"
    title="403 禁止访问"
    description="总有些门是对你关闭的"
  >
    <template #footer>
      <n-button>放轻松</n-button>
    </template>
  </n-result>
</template>

<script lang="ts">
  export default defineComponent({
    name: '403',

    inheritAttrs: false,

    defaultView: false,

    components: {},

    props: {},

    emits: [],

    setup(props, ctx) {},
  })
</script>

<style lang="scss" scoped></style>
