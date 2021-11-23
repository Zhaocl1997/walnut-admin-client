<template>
  <n-result status="404" title="404 资源不存在" description="生活总归带点荒谬">
    <template #footer>
      <n-button>找点乐子吧</n-button>
    </template>
  </n-result>
</template>

<script lang="ts">
  export default defineComponent({
    name: '404',

    inheritAttrs: false,

    defaultView: false,

    components: {},

    props: {},

    emits: [],

    setup(props, ctx) {},
  })
</script>

<style lang="scss" scoped></style>
