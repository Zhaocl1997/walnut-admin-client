<template>
  <div>
    Homepage

    <n-input v-model:value="value"></n-input>

    <n-space>
      <n-button>Default</n-button>
      <n-button type="tertiary">Tertiary</n-button>
      <n-button type="primary">Primary</n-button>
      <n-button type="info">Info</n-button>
      <n-button type="success">Success</n-button>
      <n-button type="warning">Warning</n-button>
      <n-button type="error">Error</n-button>
    </n-space>

    <WAppAuthorize value="system:user:create">
      <div class="bg-red-800">test authorize</div>
    </WAppAuthorize>

    <div v-for="i in 300" :key="i">
      {{ i }}
    </div>
  </div>
</template>

<script lang="ts">
  export default defineComponent({
    name: 'Homepage',

    inheritAttrs: false,

    props: {},

    emits: [],

    setup(props, ctx) {
      const src = ref('')
      const show = ref(false)

      return {
        value: ref(''),
      }
    },
  })
</script>

<style lang="scss" scoped></style>
