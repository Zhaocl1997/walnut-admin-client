<template>
  <w-card collapse>
    <template #header>
      <w-title :help-message="description">{{ title }}</w-title>
    </template>
    <template #default> <slot></slot> </template>
  </w-card>
</template>

<script lang="ts">
  export default defineComponent({
    name: 'WDemoCard',

    props: {
      title: String as PropType<string>,
      description: String as PropType<string>,
    },

    emits: [],

    setup(props, ctx) {},
  })
</script>
